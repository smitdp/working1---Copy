import React from "react";
import UserNav from "../../components/userNav/UserNav";
import styles from "./UserHomePage.module.scss";
import Policies from "../../components/Policies/Policies";
import PolicyDetails from "../../components/policyDetails/PolicyDetails";
import MyPolicies from "../../components/MyPolicies/MyPolicies";
import ClaimForm from "../../components/ClaimForm/ClaimForm";
import { NavLink, Outlet, Route, Routes } from "react-router-dom";
import UserProfile from "../../components/UserProfile/UserProfile";
import UserHome from "../../components/UserHome/UserHome";

const UserHomePage = () => {
  return (
    <div className={styles["main-grid-container"]}>
      <div className={styles["side-nav-container"]}>
        <UserNav />
      </div>
      <div className={styles["main-view-container"]}>
        <Outlet />
      </div>
    </div>
  );
};

export default UserHomePage;
