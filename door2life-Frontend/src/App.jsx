import React from "react";
import Faqs from "./components/Faqs/Faqs";
import Beliefs from "./components/Faqs/Beliefs";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import Footer from "./components/Footer/Footer";
import Contact from "./components/Contact/Contact";
import Navbar from "./components/Navbar/Navbar";
import DoorPages from "./components/PageUser/Index";
import SendGift from "./components/PageUser/NextPages/SendGifts";
import Referral from "./components/ReferralTree/Referral";
import UserProfile from "./components/AdminPanel/Profile/UserProfile";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import AdminLogin from "./components/AdminPanel/Auth/Adminlogin";
import AdminReferrals from "./components/AdminPanel/Referrals/AdminReferrals";
import MainBank from "./components/AdminPanel/Bank/MainBank";
import Transactions from "./components/AdminPanel/Bank/Transactions";
import SingleUserData from "./components/AdminPanel/Profile/SingleUserData";
import CreateUser from "./components/AdminPanel/Profile/CreateUser"; // Nueva importación
import ReceviceGiftsFromOwner from "./components/PageUser/NextPages/ReceviceGiftsFromOwner";
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<AdminLogin />} path="/admin/login" />
          <Route element={<AdminPanel />} path="/admin/dashboard" />
          <Route element={<SingleUserData />} path="/admin/dashboard/getUser" />
          <Route
            element={<AdminReferrals />}
            path="/admin/dashboard/referrals"
          />
          <Route element={<MainBank />} path="/admin/dashboard/mainBank" />
          <Route
            element={<Transactions />}
            path="/admin/dashboard/mainBank/transactions"
          />
          {/* Nueva ruta para crear usuarios */}
          <Route
            element={<CreateUser />}
            path="/admin/dashboard/createUser"
          />
          <Route element={<Login />} path="/login" />
          <Route element={<SignUp />} path="/register" />
          <Route
            element={<UserProfile />}
            path="/admin/dashboard/user-profile"
          />
          <Route element={<Beliefs />} path="/belief" />
          <Route element={<Faqs />} path="/faqs" />
          <Route element={<Home />} path="/" />
          <Route element={<DoorPages />} path="/userpage" />
          <Route element={<SendGift />} path="/userpage/receive-gift" />
          <Route
            element={<ReceviceGiftsFromOwner />}
            path="/userpage/send-gift"
          />
          <Route element={<Referral />} path="/userpage/workgroup" />
          <Route element={<Contact />} path="/contact" />
          <Route element={"Not Found"} path="*" />
        </Routes>
      </Router>
    </div>
  );
};
export default App;