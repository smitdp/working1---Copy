import React, { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./UserNav.module.scss";
import colorLogo from "../../assets/Images/cybSureLogoColor.svg";
import axios from "axios";
import { baseURL } from "../../Server";
import getCurrentUserId from "../../utils/getCurrentUserId";

const UserNav = () => {
  const Navigate = useNavigate();

  const currentUserId = getCurrentUserId();
  const handleLogout = async () => {
    const response = await axios.post(`${baseURL}/auth/logout/${currentUserId}`);
    localStorage.removeItem("login");
    Navigate("/");
  };

  return (
    <div className={styles["nav-main-container"]}>
      <div className={styles["nav-logo-container"]}>
        <div className={styles["logo-img-container"]}>
          <img src={colorLogo} alt="Logo" />
        </div>
        <div className={styles["logo-name"]}>CybSure</div>
      </div>

      <div className={styles["nav-links-container"]}>
        <ul>
          <li>
            <NavLink to="/home">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span className={styles["link-name"]}>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="policies">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                <path d="M10 9H8" />
                <path d="M16 13H8" />
                <path d="M16 17H8" />
              </svg>
              <span className={styles["link-name"]}>Policies</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="my-policies">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <span className={styles["link-name"]}>My Policies</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/about-us">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
              </svg>


              <span className={styles["link-name"]}>About Us</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/contact-us">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" />
              </svg>


              <span className={styles["link-name"]}>Contact Us</span>
            </NavLink>
          </li>

        </ul>
      </div>

      <div className={styles["nav-bottom-container"]}>
        <div className={styles["profile-container"]}>
          <NavLink to="/profile">
            <div className={styles["img-container"]}>
              <img src="https://data1.ibtimes.co.in/en/full/445405/actress-emma-stone-arrives-quotthe-amazing-spider-man-2quot-premiere-new-york.jpg" />
            </div>
          </NavLink>
        </div>
        <button onClick={handleLogout}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="3"
            strokeLinecap="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" x2="9" y1="12" y2="12" />
          </svg>
          <span className={styles["logout-name"]}>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default UserNav;
