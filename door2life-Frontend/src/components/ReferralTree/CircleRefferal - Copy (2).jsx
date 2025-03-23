import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./tree.css";
import { PopUp } from "../../UI/PopUp";
import { Dialog, DialogTrigger } from "../ui/dialog";

const ReferralTreeCanvas = () => {
  const { t } = useTranslation();
  const [referralTree, setReferralTree] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const fetchReferralTree = async () => {
    const userId = sessionStorage.getItem("UserId");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_HOST}/api/auth/referrals/${userId}`,
      );
      setReferralTree(response.data.referralTree);
    } catch (error) {
      console.error("Error fetching referral tree:", error);
    }
  };

  useEffect(() => {
    fetchReferralTree();
  }, []);

  const drawTree = (ctx, node, centerX, centerY) => {
    // Configuración de tiers con colores vibrantes como en la imagen de referencia
    const tiers = [
      { radius: 0, orbitRadius: 0, color: "#FF3B30", members: 1 }, // Rojo más vibrante
      { radius: 150, orbitRadius: 150, color: "#FFCC00", members: 2 }, // Amarillo dorado
      { radius: 250, orbitRadius: 250, color: "#4286f4", members: 4 }, // Azul más vibrante
      { radius: 350, orbitRadius: 350, color: "#2E7D32", members: 8 }, // Verde más vibrante
    ];

    // Dibujar órbitas con líneas más sutiles
    tiers.forEach(({ radius }) => {
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.strokeStyle = "rgba(200, 200, 200, 0.6)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    // Función para cargar una imagen de avatar (puedes usar un placeholder por defecto)
    const loadAvatar = (user, x, y, radius, color) => {
      // Avatar placeholder
      ctx.beginPath();
      ctx.arc(x, y, radius - 5, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = "#FFF";
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Simple avatar placeholder (silueta de persona)
      const headRadius = radius / 3;
      
      // Cabeza
      ctx.beginPath();
      ctx.arc(x, y - headRadius / 2, headRadius, 0, 2 * Math.PI);
      ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
      ctx.fill();
      
      // Cuerpo
      ctx.beginPath();
      ctx.moveTo(x, y - headRadius / 2 + headRadius);
      ctx.lineTo(x, y + headRadius);
      ctx.lineWidth = headRadius / 1.5;
      ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";
      ctx.stroke();
      
      // Número de orden
      if (user && user.position) {
        ctx.fillStyle = "#FFF";
        ctx.font = "bold 12px Arial";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText(user.position, x + radius - 18, y - radius + 5);
      }
    };

    // Función para dibujar un nodo (relleno o vacío)
    const drawNode = (x, y, user, depth, isEmpty = false) => {
      const nodeRadius = 38;
      
      // Círculo principal
      ctx.beginPath();
      ctx.arc(x, y, nodeRadius, 0, 2 * Math.PI);

      if (isEmpty) {
        ctx.fillStyle = "#f0f0f0";
        ctx.fill();
        ctx.strokeStyle = "#cccccc";
        ctx.setLineDash([5, 5]);
      } else {
        ctx.fillStyle = tiers[depth].color;
        ctx.fill();
        ctx.strokeStyle = "#fff";
        ctx.setLineDash([]);
      }

      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.setLineDash([]);

      // Información de usuario
      if (!isEmpty && user) {
        // Cargar avatar
        loadAvatar(user, x, y, nodeRadius - 10, tiers[depth].color);
        
        // Textos
        ctx.fillStyle = "#fff";
        ctx.font = "bold 12px Arial";
        ctx.textAlign = "center";
        ctx.fillText(user.username || "User", x, y + nodeRadius / 1.5);
        
        ctx.font = "10px Arial";
        ctx.fillText(user.referralCode || "code", x, y + nodeRadius / 1.5 + 15);

        // Si existe monto, mostrar
        if (user.amount) {
          ctx.font = "10px Arial";
          ctx.fillText(`$${user.amount}`, x, y + nodeRadius / 1.5 + 28);
        }

        // Agregar posición en el árbol (numeración secuencial)
        if (!user.position) {
          if (depth === 0) user.position = 1;
          else if (depth === 1) user.position = user.index === 0 ? 2 : 3;
          else if (depth === 2) user.position = 4 + user.index;
          else if (depth === 3) user.position = 8 + user.index;
        }

        // Almacenar coordenadas para manejo de clics
        user.x = x;
        user.y = y;
        user.depth = depth;
      }

      return user;
    };

    // Dibujar nodo central
    let position = 0;
    if (node) node.position = 1;
    const centerNode = drawNode(centerX, centerY, node, 0, !node);

    // Dibujar primera generación (2 slots)
    const firstTierSlots = 2;
    const firstTierNodes = [];
    for (let i = 0; i < firstTierSlots; i++) {
      const angle = (i * 2 * Math.PI) / firstTierSlots - Math.PI / 2;
      const x = centerX + tiers[1].orbitRadius * Math.cos(angle);
      const y = centerY + tiers[1].orbitRadius * Math.sin(angle);

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = "rgba(200, 200, 200, 0.6)";
      ctx.lineWidth = 1;
      ctx.stroke();

      const referral = node?.referrals?.[i];
      if (referral) {
        referral.index = i;
      }
      firstTierNodes.push(drawNode(x, y, referral, 1, !referral));
    }

    // Dibujar segunda generación (4 slots)
    const secondTierSlots = 4;
    const secondTierNodes = [];
    for (let i = 0; i < secondTierSlots; i++) {
      const angle = (i * 2 * Math.PI) / secondTierSlots + Math.PI / 4;
      const x = centerX + tiers[2].orbitRadius * Math.cos(angle);
      const y = centerY + tiers[2].orbitRadius * Math.sin(angle);

      ctx.beginPath();
      const parentIndex = Math.floor(i / 2);
      const parentX =
        centerX +
        tiers[1].orbitRadius *
          Math.cos((parentIndex * 2 * Math.PI) / firstTierSlots - Math.PI / 2);
      const parentY =
        centerY +
        tiers[1].orbitRadius *
          Math.sin((parentIndex * 2 * Math.PI) / firstTierSlots - Math.PI / 2);

      ctx.moveTo(parentX, parentY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = "rgba(200, 200, 200, 0.6)";
      ctx.lineWidth = 1;
      ctx.stroke();

      const referral = node?.referrals?.[parentIndex]?.referrals?.[i % 2];
      if (referral) {
        referral.index = i;
      }
      secondTierNodes.push(drawNode(x, y, referral, 2, !referral));
    }

    // Dibujar tercera generación (8 slots)
    const thirdTierSlots = 8;
    const thirdTierNodes = [];
    for (let i = 0; i < thirdTierSlots; i++) {
      const angle = (i * 2 * Math.PI) / thirdTierSlots;
      const x = centerX + tiers[3].orbitRadius * Math.cos(angle);
      const y = centerY + tiers[3].orbitRadius * Math.sin(angle);

      ctx.beginPath();
      const parentIndex = Math.floor(i / 2);
      const parentX =
        centerX +
        tiers[2].orbitRadius *
          Math.cos((parentIndex * 2 * Math.PI) / secondTierSlots + Math.PI / 4);
      const parentY =
        centerY +
        tiers[2].orbitRadius *
          Math.sin((parentIndex * 2 * Math.PI) / secondTierSlots + Math.PI / 4);

      ctx.moveTo(parentX, parentY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = "rgba(200, 200, 200, 0.6)";
      ctx.lineWidth = 1;
      ctx.stroke();

      const parentReferralIndex = Math.floor(parentIndex / 2);
      const referral =
        node?.referrals?.[parentReferralIndex]?.referrals?.[parentIndex % 2]
          ?.referrals?.[i % 2];
      if (referral) {
        referral.index = i;
      }
      thirdTierNodes.push(drawNode(x, y, referral, 3, !referral));
    }

    // Dibujar título
    ctx.fillStyle = "#333";
    ctx.font = "bold 24px Arial";
    ctx.textAlign = "center";
    ctx.fillText(t("Grupo de Donadores"), centerX, 60);

    // Dibujar leyenda de colores
    const legendX = centerX + 380;
    const legendY = 120;
    const colorLabels = [t("Founder"), t("1st Gen"), t("2nd Gen"), t("3rd Gen")];
    
    tiers.forEach((tier, i) => {
      ctx.beginPath();
      ctx.arc(legendX - 100, legendY + i * 30, 10, 0, 2 * Math.PI);
      ctx.fillStyle = tier.color;
      ctx.fill();
      
      ctx.fillStyle = "#333";
      ctx.font = "14px Arial";
      ctx.textAlign = "left";
      ctx.fillText(colorLabels[i], legendX - 80, legendY + i * 30 + 5);
    });

    // Retornar nodos para manejo de clics
    return {
      centerNode,
      firstTierNodes,
      secondTierNodes,
      thirdTierNodes,
    };
  };

  const handleCanvasClick = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (!referralTree) return;

    const nodesMap = drawTree(
      canvas.getContext("2d"),
      referralTree,
      canvas.width / 2,
      canvas.height / 2,
    );

    // Función para encontrar el nodo clickeado
    const findClickedNode = (nodes) => {
      return nodes.find((node) => {
        if (!node) return false;
        const dx = x - node.x;
        const dy = y - node.y;
        return Math.sqrt(dx * dx + dy * dy) <= 38;
      });
    };

    // Buscar en todos los niveles
    const clickedNode = 
      findClickedNode([nodesMap.centerNode]) || 
      findClickedNode(nodesMap.firstTierNodes) || 
      findClickedNode(nodesMap.secondTierNodes) || 
      findClickedNode(nodesMap.thirdTierNodes);

    if (clickedNode) {
      // Contar nodos en tercera generación
      const thirdTierFilledNodes = nodesMap.thirdTierNodes.filter((node) => node);
      
      // Si es un nodo de la tercera generación y hay menos de 8 miembros, mostrar toast
      if (clickedNode.depth === 3 && thirdTierFilledNodes.length < 8) {
        toast.info("Complete your 3rd Generation!", {
          position: "top-center",
          autoClose: 3000,
        });
      } else {
        // Para cualquier otro nodo o si la tercera generación está completa
        setSelectedUser(clickedNode);
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    const canvasWidth = 800;
    const canvasHeight = 800;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Fondo circular
    ctx.beginPath();
    ctx.arc(canvasWidth/2, canvasHeight/2, 400, 0, 2 * Math.PI);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.strokeStyle = "#f0f0f0";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Dibujar árbol si hay datos
    if (referralTree) {
      drawTree(ctx, referralTree, canvasWidth / 2, canvasHeight / 2);
    } else {
      // Mensaje de carga
      ctx.fillStyle = "#333";
      ctx.font = "20px Arial";
      ctx.textAlign = "center";
      ctx.fillText(t("Loading referral data..."), canvasWidth / 2, canvasHeight / 2);
    }

    // Agregar listener de clic
    canvas.addEventListener("click", handleCanvasClick);

    // Limpieza
    return () => {
      canvas.removeEventListener("click", handleCanvasClick);
    };
  }, [referralTree, t]);

  return (
    <>
      <div className="w-full px-4 mt-8 mb-16 bg-white">
        <div
          ref={containerRef}
          className="flex w-full overflow-auto justify-center"
          style={{
            maxHeight: "820px",
            borderRadius: "8px",
          }}
        >
          <Dialog>
            <DialogTrigger asChild className="cursor-pointer">
              <canvas
                ref={canvasRef}
                style={{
                  backgroundColor: "white",
                  borderRadius: "50%",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              />
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
      </div>

      {/* Toastify Container */}
      <ToastContainer />
    </>
  );
};

export default ReferralTreeCanvas;