import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PopUp } from "../../UI/PopUp";
import { Dialog, DialogTrigger } from "../ui/dialog";

const ReferralCircleView = () => {
  const { t } = useTranslation();
  const [referralTree, setReferralTree] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const svgRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchReferralTree = async () => {
    setIsLoading(true);
    const userId = sessionStorage.getItem("UserId");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_HOST}/api/auth/referrals/${userId}`
      );
      setReferralTree(response.data.referralTree);
    } catch (error) {
      console.error("Error fetching referral tree:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReferralTree();
  }, []);

  // Crear un objeto con datos procesados para la visualización
  const processTreeData = (node) => {
    if (!node) return null;

    const levels = [
      { level: 0, count: 1, color: "#FF3B30", title: "Founder" }, // Centro (rojo)
      { level: 1, count: 2, color: "#FFCC00", title: "1st Gen" }, // Primera generación (amarillo)
      { level: 2, count: 4, color: "#4286F4", title: "2nd Gen" }, // Segunda generación (azul)
      { level: 3, count: 8, color: "#2E7D32", title: "3rd Gen" } // Tercera generación (verde)
    ];

    // Estructura para mantener todos los nodos y sus posiciones
    const structuredData = {
      centerNode: { 
        ...node, 
        level: 0, 
        position: 1,
        color: levels[0].color
      },
      firstLevel: [],
      secondLevel: [],
      thirdLevel: []
    };

    // Procesar primera generación
    if (node.referrals) {
      node.referrals.forEach((child, idx) => {
        if (child) {
          structuredData.firstLevel.push({ 
            ...child, 
            level: 1, 
            position: idx + 2, // 2 y 3
            color: levels[1].color,
            angle: idx * Math.PI + Math.PI/2 // Posiciones a 90° y 270°
          });

          // Procesar segunda generación
          if (child.referrals) {
            child.referrals.forEach((grandchild, gIdx) => {
              if (grandchild) {
                const secondLevelIdx = idx * 2 + gIdx;
                structuredData.secondLevel.push({ 
                  ...grandchild, 
                  level: 2, 
                  position: secondLevelIdx + 4, // 4, 5, 6, 7
                  color: levels[2].color,
                  angle: secondLevelIdx * Math.PI/2 + Math.PI/4 // 45°, 135°, 225°, 315°
                });

                // Procesar tercera generación
                if (grandchild.referrals) {
                  grandchild.referrals.forEach((greatgrandchild, ggIdx) => {
                    if (greatgrandchild) {
                      const thirdLevelIdx = secondLevelIdx * 2 + ggIdx;
                      structuredData.thirdLevel.push({ 
                        ...greatgrandchild, 
                        level: 3, 
                        position: thirdLevelIdx + 8, // 8-15
                        color: levels[3].color,
                        angle: thirdLevelIdx * Math.PI/4 // 0°, 45°, 90°, ...
                      });
                    }
                  });
                }
              }
            });
          }
        }
      });
    }

    return { structuredData, levels };
  };

  const handleNodeClick = (user) => {
    if (user && user.level === 3) {
      // Verificar si la tercera generación está completa
      const processedData = processTreeData(referralTree);
      if (processedData && processedData.structuredData.thirdLevel.length < 8) {
        toast.info("Complete your 3rd Generation!", {
          position: "top-center",
          autoClose: 3000,
        });
      } else {
        setSelectedUser(user);
      }
    } else if (user) {
      setSelectedUser(user);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-3xl text-gray-500 animate-pulse">
          {t("Loading...")}
        </div>
      </div>
    );
  }

  const processedData = processTreeData(referralTree);
  
  if (!processedData) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-2xl text-red-500">
          {t("Error loading referral data")}
        </div>
      </div>
    );
  }

  const { structuredData, levels } = processedData;
  const centerX = 400;
  const centerY = 400;
  const radius = [80, 180, 280, 380]; // Radios para cada nivel

  // Función para calcular coordenadas según nivel y ángulo
  const calculatePosition = (level, angle) => {
    return {
      x: centerX + radius[level] * Math.cos(angle),
      y: centerY + radius[level] * Math.sin(angle)
    };
  };

  return (
    <div className="w-full flex justify-center my-8">
      <div className="relative">
        <h2 className="text-3xl font-bold text-center mb-6">{t("GRUPO DE DONADORES")}</h2>
        
        <Dialog>
          <DialogTrigger asChild>
            <svg 
              ref={svgRef} 
              width="800" 
              height="800" 
              className="border rounded-full bg-white shadow-lg cursor-pointer"
            >
              {/* Círculos de nivel */}
              {radius.map((r, idx) => (
                <circle 
                  key={`orbit-${idx}`}
                  cx={centerX}
                  cy={centerY}
                  r={r}
                  fill="none"
                  stroke="#EEEEEE"
                  strokeWidth={2}
                />
              ))}

              {/* Líneas de conexión */}
              {/* Centro a primera generación */}
              {structuredData.firstLevel.map((node) => {
                const pos = calculatePosition(node.level, node.angle);
                return (
                  <line 
                    key={`line-center-to-${node.position}`}
                    x1={centerX}
                    y1={centerY}
                    x2={pos.x}
                    y2={pos.y}
                    stroke="#DDDDDD"
                    strokeWidth={1.5}
                  />
                );
              })}

              {/* Primera a segunda generación */}
              {structuredData.secondLevel.map((node) => {
                const pos = calculatePosition(node.level, node.angle);
                const parentIdx = Math.floor((node.position - 4) / 2);
                const parentNode = structuredData.firstLevel[parentIdx];
                if (parentNode) {
                  const parentPos = calculatePosition(parentNode.level, parentNode.angle);
                  return (
                    <line 
                      key={`line-first-to-${node.position}`}
                      x1={parentPos.x}
                      y1={parentPos.y}
                      x2={pos.x}
                      y2={pos.y}
                      stroke="#DDDDDD"
                      strokeWidth={1.5}
                    />
                  );
                }
                return null;
              })}

              {/* Segunda a tercera generación */}
              {structuredData.thirdLevel.map((node) => {
                const pos = calculatePosition(node.level, node.angle);
                const parentIdx = Math.floor((node.position - 8) / 2);
                const parentNode = structuredData.secondLevel[parentIdx];
                if (parentNode) {
                  const parentPos = calculatePosition(parentNode.level, parentNode.angle);
                  return (
                    <line 
                      key={`line-second-to-${node.position}`}
                      x1={parentPos.x}
                      y1={parentPos.y}
                      x2={pos.x}
                      y2={pos.y}
                      stroke="#DDDDDD"
                      strokeWidth={1.5}
                    />
                  );
                }
                return null;
              })}

              {/* Nodos vacíos de tercera generación */}
              {Array.from({ length: 8 }).map((_, idx) => {
                const existingNode = structuredData.thirdLevel.find(n => n.position === idx + 8);
                if (!existingNode) {
                  const angle = idx * Math.PI/4;
                  const pos = calculatePosition(3, angle);
                  return (
                    <g key={`empty-third-${idx}`}>
                      <circle 
                        cx={pos.x}
                        cy={pos.y}
                        r={36}
                        fill="#F0F0F0"
                        stroke="#DDDDDD"
                        strokeWidth={1.5}
                        strokeDasharray="5,5"
                      />
                    </g>
                  );
                }
                return null;
              })}

              {/* Nodos vacíos de segunda generación */}
              {Array.from({ length: 4 }).map((_, idx) => {
                const existingNode = structuredData.secondLevel.find(n => n.position === idx + 4);
                if (!existingNode) {
                  const angle = idx * Math.PI/2 + Math.PI/4;
                  const pos = calculatePosition(2, angle);
                  return (
                    <g key={`empty-second-${idx}`}>
                      <circle 
                        cx={pos.x}
                        cy={pos.y}
                        r={36}
                        fill="#F0F0F0"
                        stroke="#DDDDDD"
                        strokeWidth={1.5}
                        strokeDasharray="5,5"
                      />
                    </g>
                  );
                }
                return null;
              })}

              {/* Nodos vacíos de primera generación */}
              {Array.from({ length: 2 }).map((_, idx) => {
                const existingNode = structuredData.firstLevel.find(n => n.position === idx + 2);
                if (!existingNode) {
                  const angle = idx * Math.PI + Math.PI/2;
                  const pos = calculatePosition(1, angle);
                  return (
                    <g key={`empty-first-${idx}`}>
                      <circle 
                        cx={pos.x}
                        cy={pos.y}
                        r={36}
                        fill="#F0F0F0"
                        stroke="#DDDDDD"
                        strokeWidth={1.5}
                        strokeDasharray="5,5"
                      />
                    </g>
                  );
                }
                return null;
              })}

              {/* Nodo central */}
              <g 
                onClick={() => handleNodeClick(structuredData.centerNode)}
                style={{ cursor: 'pointer' }}
              >
                <circle 
                  cx={centerX}
                  cy={centerY}
                  r={40}
                  fill={structuredData.centerNode.color}
                />
                
                {/* Avatar placeholder */}
                <circle 
                  cx={centerX}
                  cy={centerY - 8}
                  r={15}
                  fill="rgba(255,255,255,0.3)"
                />
                <rect 
                  x={centerX - 8}
                  y={centerY - 5}
                  width={16}
                  height={20}
                  rx={8}
                  fill="rgba(255,255,255,0.3)"
                />
                
                {/* Número de posición */}
                <circle 
                  cx={centerX + 25}
                  cy={centerY - 25}
                  r={12}
                  fill="white"
                  stroke="#ddd"
                />
                <text 
                  x={centerX + 25}
                  y={centerY - 21}
                  textAnchor="middle"
                  fontSize={12}
                  fontWeight="bold"
                  fill="#333"
                >
                  {structuredData.centerNode.position}
                </text>
                
                {/* Nombre de usuario */}
                <text 
                  x={centerX}
                  y={centerY + 15}
                  textAnchor="middle"
                  fontSize={12}
                  fontWeight="bold"
                  fill="white"
                >
                  {structuredData.centerNode.username || "Usuario"}
                </text>
                
                {/* Código de referido */}
                <text 
                  x={centerX}
                  y={centerY + 28}
                  textAnchor="middle"
                  fontSize={9}
                  fill="white"
                >
                  {structuredData.centerNode.referralCode || "código"}
                </text>
              </g>

              {/* Nodos de primera generación */}
              {structuredData.firstLevel.map((node) => {
                const pos = calculatePosition(node.level, node.angle);
                return (
                  <g 
                    key={`node-${node.position}`}
                    onClick={() => handleNodeClick(node)}
                    style={{ cursor: 'pointer' }}
                  >
                    <circle 
                      cx={pos.x}
                      cy={pos.y}
                      r={36}
                      fill={node.color}
                    />
                    
                    {/* Avatar placeholder */}
                    <circle 
                      cx={pos.x}
                      cy={pos.y - 8}
                      r={12}
                      fill="rgba(255,255,255,0.3)"
                    />
                    <rect 
                      x={pos.x - 6}
                      y={pos.y - 6}
                      width={12}
                      height={16}
                      rx={6}
                      fill="rgba(255,255,255,0.3)"
                    />
                    
                    {/* Número de posición */}
                    <circle 
                      cx={pos.x + 22}
                      cy={pos.y - 22}
                      r={12}
                      fill="white"
                      stroke="#ddd"
                    />
                    <text 
                      x={pos.x + 22}
                      y={pos.y - 18}
                      textAnchor="middle"
                      fontSize={11}
                      fontWeight="bold"
                      fill="#333"
                    >
                      {node.position}
                    </text>
                    
                    {/* Nombre de usuario */}
                    <text 
                      x={pos.x}
                      y={pos.y + 12}
                      textAnchor="middle"
                      fontSize={11}
                      fontWeight="bold"
                      fill="#333"
                    >
                      {node.username || "Usuario"}
                    </text>
                    
                    {/* Código de referido */}
                    <text 
                      x={pos.x}
                      y={pos.y + 24}
                      textAnchor="middle"
                      fontSize={8}
                      fill="#333"
                    >
                      {node.referralCode || "código"}
                    </text>
                  </g>
                );
              })}

              {/* Nodos de segunda generación */}
              {structuredData.secondLevel.map((node) => {
                const pos = calculatePosition(node.level, node.angle);
                return (
                  <g 
                    key={`node-${node.position}`}
                    onClick={() => handleNodeClick(node)}
                    style={{ cursor: 'pointer' }}
                  >
                    <circle 
                      cx={pos.x}
                      cy={pos.y}
                      r={36}
                      fill={node.color}
                    />
                    
                    {/* Avatar placeholder */}
                    <circle 
                      cx={pos.x}
                      cy={pos.y - 8}
                      r={12}
                      fill="rgba(255,255,255,0.3)"
                    />
                    <rect 
                      x={pos.x - 6}
                      y={pos.y - 6}
                      width={12}
                      height={16}
                      rx={6}
                      fill="rgba(255,255,255,0.3)"
                    />
                    
                    {/* Número de posición */}
                    <circle 
                      cx={pos.x + 22}
                      cy={pos.y - 22}
                      r={12}
                      fill="white"
                      stroke="#ddd"
                    />
                    <text 
                      x={pos.x + 22}
                      y={pos.y - 18}
                      textAnchor="middle"
                      fontSize={11}
                      fontWeight="bold"
                      fill="#333"
                    >
                      {node.position}
                    </text>
                    
                    {/* Nombre de usuario */}
                    <text 
                      x={pos.x}
                      y={pos.y + 12}
                      textAnchor="middle"
                      fontSize={11}
                      fontWeight="bold"
                      fill="white"
                    >
                      {node.username || "Usuario"}
                    </text>
                    
                    {/* Código de referido */}
                    <text 
                      x={pos.x}
                      y={pos.y + 24}
                      textAnchor="middle"
                      fontSize={8}
                      fill="white"
                    >
                      {node.referralCode || "código"}
                    </text>
                  </g>
                );
              })}

              {/* Nodos de tercera generación */}
              {structuredData.thirdLevel.map((node) => {
                const pos = calculatePosition(node.level, node.angle);
                return (
                  <g 
                    key={`node-${node.position}`}
                    onClick={() => handleNodeClick(node)}
                    style={{ cursor: 'pointer' }}
                  >
                    <circle 
                      cx={pos.x}
                      cy={pos.y}
                      r={36}
                      fill={node.color}
                    />
                    
                    {/* Avatar placeholder */}
                    <circle 
                      cx={pos.x}
                      cy={pos.y - 8}
                      r={12}
                      fill="rgba(255,255,255,0.3)"
                    />
                    <rect 
                      x={pos.x - 6}
                      y={pos.y - 6}
                      width={12}
                      height={16}
                      rx={6}
                      fill="rgba(255,255,255,0.3)"
                    />
                    
                    {/* Número de posición */}
                    <circle 
                      cx={pos.x + 22}
                      cy={pos.y - 22}
                      r={12}
                      fill="white"
                      stroke="#ddd"
                    />
                    <text 
                      x={pos.x + 22}
                      y={pos.y - 18}
                      textAnchor="middle"
                      fontSize={11}
                      fontWeight="bold"
                      fill="#333"
                    >
                      {node.position}
                    </text>
                    
                    {/* Nombre de usuario */}
                    <text 
                      x={pos.x}
                      y={pos.y + 12}
                      textAnchor="middle"
                      fontSize={11}
                      fontWeight="bold"
                      fill="white"
                    >
                      {node.username || "Usuario"}
                    </text>
                    
                    {/* Código de referido */}
                    <text 
                      x={pos.x}
                      y={pos.y + 24}
                      textAnchor="middle"
                      fontSize={8}
                      fill="white"
                    >
                      {node.referralCode || "código"}
                    </text>
                  </g>
                );
              })}

              {/* Leyenda */}
              <g transform="translate(600, 80)">
                {levels.map((level, idx) => (
                  <g key={`legend-${idx}`} transform={`translate(0, ${idx * 25})`}>
                    <circle cx={10} cy={10} r={8} fill={level.color} />
                    <text x={25} y={14} fontSize={12} fill="#555">{level.title}</text>
                  </g>
                ))}
              </g>
            </svg>
          </DialogTrigger>

          {selectedUser && (
            <PopUp
              onOpenChange={() => setSelectedUser(null)}
              username={selectedUser.username}
              email={selectedUser.email}
              id={selectedUser.userId}
              doorStatus={selectedUser.doors}
            />
          )}
        </Dialog>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ReferralCircleView;