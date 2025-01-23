import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

import "./tree.css";

const ReferralTreeCanvas = () => {
  const { t } = useTranslation();
  const [referralTree, setReferralTree] = useState(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const fetchReferralTree = async () => {
    const userId = sessionStorage.getItem("UserId");
    try {
      const response = await axios.get(
        `https://donations-prdd.onrender.com/api/auth/referrals/673d75c5d4bbde57134bc77a`
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
    // Previous drawTree implementation remains the same
    const tiers = [
      { radius: 0, orbitRadius: 0, color: "#FF0000", members: 1 },
      { radius: 150, orbitRadius: 150, color: "#d6ba04", members: 2 },
      { radius: 250, orbitRadius: 250, color: "#287FF9", members: 4 },
      { radius: 350, orbitRadius: 350, color: "#008000", members: 8 },
    ];

    // Draw orbit circles
    tiers.forEach(({ radius }) => {
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.strokeStyle = "rgba(0, 0, 0, 0.1)";
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    // Function to draw a node (filled or empty)
    const drawNode = (x, y, user, depth, isEmpty = false) => {
      ctx.beginPath();
      ctx.arc(x, y, 38, 0, 2 * Math.PI);

      if (isEmpty) {
        ctx.fillStyle = "#f0f0f0";
        ctx.fill();
        ctx.strokeStyle = "#cccccc";
        ctx.setLineDash([5, 5]);
      } else {
        ctx.fillStyle = tiers[depth].color;
        ctx.fill();
        ctx.strokeStyle = "#000";

        ctx.setLineDash([]);
      }

      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);

      if (!isEmpty && user) {
        ctx.fillStyle = "#fff";
        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        ctx.fillText(user.username || "User", x, y - 2);
        ctx.fillText(user.referralCode || "code", x, y + 11);

        if (user.amount) {
          ctx.font = "10px Arial";
          ctx.fillText(`$${user.amount}`, x, y + 18);
        }
      }
    };

    // Draw center node
    drawNode(centerX, centerY, node, 0, !node);

    // Draw first tier (2 slots)
    const firstTierSlots = 2;
    for (let i = 0; i < firstTierSlots; i++) {
      const angle = (i * 2 * Math.PI) / firstTierSlots - Math.PI / 2;
      const x = centerX + tiers[1].orbitRadius * Math.cos(angle);
      const y = centerY + tiers[1].orbitRadius * Math.sin(angle);

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = "#FF0000";
      ctx.lineWidth = 1;
      ctx.stroke();

      const referral = node?.referrals?.[i];
      drawNode(x, y, referral, 1, !referral);
    }

    // Draw second tier (4 slots)
    const secondTierSlots = 4;
    for (let i = 0; i < secondTierSlots; i++) {
      const angle = (i * 2 * Math.PI) / secondTierSlots - Math.PI / 1;
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
      ctx.strokeStyle = "rgba(0, 0, 0, 0.2)";
      ctx.lineWidth = 1;
      ctx.stroke();

      const referral = node?.referrals?.[parentIndex]?.referrals?.[i % 2];
      drawNode(x, y, referral, 2, !referral);
    }

    // Draw third tier (8 slots)
    const thirdTierSlots = 8;
    for (let i = 0; i < thirdTierSlots; i++) {
      const angle = (i * 2 * Math.PI) / thirdTierSlots - Math.PI / 2;
      const x = centerX + tiers[3].orbitRadius * Math.cos(angle);
      const y = centerY + tiers[3].orbitRadius * Math.sin(angle);

      ctx.beginPath();
      const parentIndex = Math.floor(i / 2);
      const parentX =
        centerX +
        tiers[2].orbitRadius *
          Math.cos((parentIndex * 2 * Math.PI) / secondTierSlots - Math.PI / 2);
      const parentY =
        centerY +
        tiers[2].orbitRadius *
          Math.sin((parentIndex * 2 * Math.PI) / secondTierSlots - Math.PI / 2);

      ctx.moveTo(parentX, parentY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = "rgba(0, 0, 0, 0.2)";
      ctx.lineWidth = 1;
      ctx.stroke();

      const parentReferralIndex = Math.floor(parentIndex / 2);
      const referral =
        node?.referrals?.[parentReferralIndex]?.referrals?.[parentIndex % 2]
          ?.referrals?.[i % 2];
      drawNode(x, y, referral, 3, !referral);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const canvasWidth = 800; // Fixed large width
    const canvasHeight = 800; // Fixed large height

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw tree if data is available
    drawTree(ctx, referralTree, canvasWidth / 2, canvasHeight / 2);
  }, [referralTree]);

  return (
    <>
      <div className="w-full px-4 mt-16 mb-16 bg-white">
        <div className="flex flex-col items-center justify-center">
          <h2 className="mx-auto text-4xl text-black">{t("Referral Tree")}</h2>
          <h2 className="mx-auto mt-2 text-sm text-center text-black">
            {t(
              "Complete your 3rd Generation & Send donations request By Clicking on it"
            )}
          </h2>
        </div>
        <div
          ref={containerRef}
          className="flex w-full mt-16 overflow-auto md:justify-center"
          style={{
            maxHeight: "800px",
            borderRadius: "8px",
          }}
        >
          <canvas
            ref={canvasRef}
            style={{
              backgroundColor: "white",
              borderRadius: "50%",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default ReferralTreeCanvas;
