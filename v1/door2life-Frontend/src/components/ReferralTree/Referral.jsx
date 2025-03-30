import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./tree.css";
import { PopUp } from "../../UI/PopUp";
import { Dialog, DialogTrigger } from "../ui/dialog";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { useTranslation } from "react-i18next";

import ReferralTreeCanvas from "./CircleRefferal";
import ReferralCircleView from "./ReferralCircleView";
import { Button } from "../ui/button";

const ReferralTree = () => {
  const { t } = useTranslation();
  const [referralTree, setReferralTree] = useState(null);
  const [doorStatus, setDoorStatus] = useState({});
  const button = ["Tree View", "Circular View"];
  const [view, setView] = useState("Tree View");

  useEffect(() => {
    const fetchReferralTree = async () => {
      const userId = sessionStorage.getItem("UserId");
      try {
        const [treeResponse, doorResponse] = await Promise.all([
          axios.get(
            `${import.meta.env.VITE_BACKEND_HOST}/api/auth/referrals/${userId}`,
          ),
          axios.get(
            `${import.meta.env.VITE_BACKEND_HOST}/api/user/door-status/${userId}`,
          ),
        ]);

        setReferralTree(treeResponse.data.referralTree);
        setDoorStatus(doorResponse.data.doorStatus);
      } catch (error) {
        console.error("Error fetching referral tree or door status:", error);
      }
    };

    fetchReferralTree();
  }, []);

  // Asignar posiciones a los nodos para mantener numeración consistente
  const assignPositions = (node, tier = 1, parentPath = [], currentPosition = 0) => {
    if (!node) return null;
    
    // Asignar posición basada en la generación
    let position;
    if (tier === 1) position = 1;
    else if (tier === 2) position = parentPath[0] === 0 ? 2 : 3;
    else if (tier === 3) {
      const basePos = parentPath[0] === 0 ? 4 : 6;
      position = basePos + parentPath[1];
    }
    else if (tier === 4) {
      const firstParent = parentPath[0];
      const secondParent = parentPath[1];
      const basePos = firstParent === 0 
        ? (secondParent === 0 ? 8 : 10)
        : (secondParent === 0 ? 12 : 14);
      position = basePos + parentPath[2];
    }

    const nodeWithPosition = {
      ...node,
      position,
      children: []
    };

    // Procesar referrals recursivamente
    if (node.referrals && node.referrals.length > 0) {
      nodeWithPosition.children = node.referrals.map((child, i) => 
        assignPositions(child, tier + 1, [...parentPath, i], i)
      );
    }

    return nodeWithPosition;
  };

  // Renderizar árbol mejorado con avatares y numeración
  const renderEnhancedTree = (node, tier = 1, displayedCount = 0) => {
    if (!node || displayedCount >= 15) return { renderedNodes: null, displayedCount };
    displayedCount++;

    // Colores por nivel
    const tierColors = {
      1: "#FF3B30", // Rojo
      2: "#FFCC00", // Amarillo
      3: "#4286f4", // Azul
      4: "#2E7D32", // Verde
    };

    const tierLabels = {
      1: "Founder",
      2: "1st Gen",
      3: "2nd Gen",
      4: "3rd Gen",
    };

    const isTier4 = tier === 4;
    
    const { renderedNodes: childNodes, displayedCount: updatedCount } =
      node.children && node.children.length > 0
        ? node.children.reduce(
            (acc, child) => {
              if (acc.displayedCount >= 15) return acc;
              const childResult = renderEnhancedTree(
                child,
                tier + 1,
                acc.displayedCount,
              );
              return {
                renderedNodes: [
                  ...acc.renderedNodes,
                  childResult.renderedNodes,
                ],
                displayedCount: childResult.displayedCount,
              };
            },
            { renderedNodes: [], displayedCount },
          )
        : { renderedNodes: [], displayedCount };

    return {
      renderedNodes: (
        <>
          <Dialog>
            <div className={`node-container tier-${tier}`}>
              {isTier4 ? (
                <DialogTrigger>
                  <div 
                    className="node hover:scale-90"
                    style={{
                      backgroundColor: tierColors[tier],
                      position: 'relative'
                    }}
                  >
                    {/* Número de posición */}
                    {node.position && (
                      <div className="position-number">{node.position}</div>
                    )}
                    
                    {/* Avatar placeholder */}
                    <div className="avatar-placeholder"></div>
                    
                    <p className="username">{node.username}</p>
                    <p className="text-xs username">{node.referralCode}</p>
                    <p className="text-[.8rem] email">{node.email}</p>
                  </div>
                </DialogTrigger>
              ) : (
                <div 
                  className="node"
                  style={{
                    backgroundColor: tierColors[tier],
                    position: 'relative'
                  }}
                >
                  {/* Número de posición */}
                  {node.position && (
                    <div className="position-number">{node.position}</div>
                  )}
                  
                  {/* Avatar placeholder */}
                  <div className="avatar-placeholder"></div>
                  
                  <p className="username">{node.username}</p>
                  <p className="text-xs username">{node.referralCode}</p>
                  <p className="text-[.8rem] email">{node.email}</p>
                </div>
              )}

              {childNodes.length > 0 && (
                <div className="flex-wrap referrals-container xl:flex-nowrap">
                  {childNodes}
                </div>
              )}
            </div>

            {isTier4 && (
              <PopUp
                username={node.username}
                email={node.email}
                id={node.userId}
                doorStatus={doorStatus}
              />
            )}
          </Dialog>
        </>
      ),
      displayedCount: updatedCount,
    };
  };

  // Procesar el árbol con posiciones
  const processedTree = referralTree ? assignPositions(referralTree) : null;
  
  // Renderizar árbol mejorado
  const { renderedNodes } = processedTree
    ? renderEnhancedTree(processedTree)
    : { renderedNodes: null };

  return (
    <>
      <Navbar />
      <div className="min-h-screen mt-16 mb-16 text-white bg-white">
        <div className="left-0 top-[12rem] grid grid-cols-2 mx-16 rounded-lg w-[14rem] h-[8rem] place-items-center text-gray bg-white shadow-md md:absolute xl:left-[60rem] xl:top-[4rem] my-7">
          <div className="flex flex-col gap-[.50rem] px-2 test-gray">
            <p className="bg-[#FF3B30] w-4 h-4 rounded-full"></p>
            <p className="bg-[#FFCC00] w-4 h-4 rounded-full"></p>
            <p className="bg-[#4286f4] w-4 h-4 rounded-full"></p>
            <p className="bg-[#2E7D32] w-4 h-4 rounded-full"></p>
          </div>
          <div className="px-2 -ml-16 test-gray">
            <h1>{t("Founder")}</h1>
            <h1>{t("1st Gen")}</h1>
            <h1>{t("2nd Gen")}</h1>
            <h1>{t("3rd Gen")}</h1>
          </div>
        </div>
        <Link to={"/userpage"}>
          <h1 className="left-0 px-4 py-2 mx-auto rounded-lg md:mx-16 bg-greengrass hover:bg-green w-max md:absolute my-7">
            {t("Go Back")}
          </h1>
        </Link>
        <div className="flex flex-col items-center justify-center w-full">
          <h2 className="mx-auto text-4xl text-black">{t("Referral Tree")}</h2>
          <h2 className="mx-auto mt-2 text-sm text-center text-black">
            {t(
              "Complete your 3rd Generation & Send donations request By Clicking on it",
            )}
          </h2>
        </div>
        {processedTree ? (
          <>
            <div className={`flex items-center gap-2 my-10 justify-center w-full`}>
              {button.map((btn) => (
                <Button
                  key={btn}
                  onClick={() => setView(btn)}
                  className={` ${
                    view === btn ? "bg-green text-black" : "bg-gray"
                  } `}
                >
                  {btn}
                </Button>
              ))}
            </div>

            {view === "Tree View" && renderedNodes}
            {view === "Circular View" && <ReferralCircleView />}
          </>
        ) : (
          <h1 className="w-full mx-auto mt-10 text-center text-black animate-spin transform-origin text-7xl">
            .
          </h1>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ReferralTree;