import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./tree.css";
import { PopUp } from "./PopUp";
import { Dialog, DialogTrigger } from "../../ui/dialog";
import Footer from "../UI/Footer";
import Navbar from "../UI/Navbar";
import { useTranslation } from "react-i18next"; // Import translation hook
import ReferralTreeCanvasAdmin from "./CircularView";
import { Button } from "../../ui/button";
const AdminReferrals = () => {
  const [referralTree, setReferralTree] = useState(null); // Full tree
  const [currentNode, setCurrentNode] = useState(null); // Currently displayed node
  const { t } = useTranslation(); // Initialize translation hook
  const button = ["Tree View", "Circular View"];
  const [view, setView] = useState("Tree View");

  useEffect(() => {
    const fetchReferralTree = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_HOST}/api/auth/referrals/673d75c5d4bbde57134bc77a`,
        );
        setReferralTree(response.data.referralTree);
        setCurrentNode(response.data.referralTree); // Start with the root node
      } catch (error) {
        console.error("Error fetching referral tree:", error);
      }
    };

    fetchReferralTree();
  }, []);

  // Function to render the tree recursively
  const renderTree = (node, tier = 1) => {
    if (!node) return null;

    return (
      <Dialog>
        <div
          onClick={(e) => {
            e.stopPropagation(); // Prevent parent nodes from being triggered
            setCurrentNode(node); // Set the clicked node as the current node
          }}
          className={`node-container tier-${tier}`}
        >
          <DialogTrigger>
            <div className="node">
              <p className="username">{node.username}</p>
              <p className="text-xs username ">{node.referralCode}</p>
              <p className="text-[.8rem] email">{node.email}</p>
            </div>
          </DialogTrigger>
          {node.referrals && node.referrals.length > 0 && (
            <div className="flex-wrap referrals-container xl:flex-nowrap">
              {node.referrals.map((child) => (
                <div key={child.userId} className="child-referral">
                  {renderTree(child, tier + 1)}
                </div>
              ))}
            </div>
          )}
        </div>

        <PopUp
          username={node.username}
          email={node.email}
          id={node.userId}
          ref={node.referrals}
        />
      </Dialog>
    );
  };

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen tree-container">
        <div className="left-0 top-[12rem] grid grid-cols-2 mx-16 rounded-lg w-[14rem] h-[8rem] place-items-center text-gray bg-green md:absolute xl:left-[60rem] xl:top-[4rem] my-7">
          <div className="flex flex-col gap-[.50rem] px-2 test-gray">
            <p className="bg-[#59f2d9] w-4 h-4 rounded-full"></p>
            <p className="bg-[#17bea2] w-4 h-4 rounded-full"></p>
            <p className="bg-[#107766] w-4 h-4 rounded-full"></p>
            <p className="bg-[#154c42] w-4 h-4 rounded-full"></p>
          </div>
          <div className="px-2 -ml-16 ">
            <h1>{t("founder")}</h1> {/* Translated text */}
            <h1>{t("firstGen")}</h1> {/* Translated text */}
            <h1>{t("secondGen")}</h1> {/* Translated text */}
            <h1>{t("thirdGen")}</h1> {/* Translated text */}
          </div>
        </div>
        <Link to={"/admin/dashboard"}>
          <h1 className="top-0 left-0 px-4 py-2 mx-auto text-white rounded-lg md:mx-16 hover:bg-green bg-greengrass w-max md:absolute my-7">
            {t("Go Back")}
          </h1>
        </Link>
        <div className="flex flex-col items-center justify-center w-full mx-16">
          <h2 className="mx-auto my-10 text-4xl font-extrabold text-grassGreen">
            {t("referralTree")}
          </h2>{" "}
          {/* Translated text */}
          {currentNode !== referralTree && (
            <button
              onClick={() => setCurrentNode(referralTree)} // Reset to the full tree
              className="px-4 py-2 mt-4 bg-blue-500 rounded-lg"
            >
              {t("showFullTree")} {/* Translated text */}
            </button>
          )}
        </div>
        {currentNode ? (
          <>
            <div
              className={`flex items-center gap-2 my-10 justify-center w-full`}
            >
              {button.map((btn) => (
                <Button
                  onClick={() => setView(btn)}
                  className={` ${view === btn ? "bg-gray text-white" : ""}`}
                >
                  {btn}
                </Button>
              ))}
            </div>

            {view === "Tree View" && renderTree(currentNode)}
            {view === "Circular View" && <ReferralTreeCanvasAdmin />}
          </>
        ) : (
          <p className="text-white animate-spin transform-origin text-7xl">.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default AdminReferrals;
