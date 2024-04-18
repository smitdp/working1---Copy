import React from 'react'
import styles from './AdminNav.module.scss'
import colorLogo from "../../assets/Images/cybSureLogoColor.svg";
import { NavLink, useNavigate } from 'react-router-dom';


const AdminNav = () => {
    const Navigate = useNavigate();
    const handleLogout = () => {
      localStorage.removeItem("login");
      Navigate("/")
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
            <NavLink to="/admin-home">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M3 3v18h18"/><path d="M7 12v5h12V8l-5 5-4-4Z"/>
              </svg>
             <span className={styles["link-name"]}>Analytics</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="manage-users">
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
                <circle cx="9" cy="7" r="4"/><path d="M10 15H6a4 4 0 0 0-4 4v2"/><path d="m21.7 16.4-.9-.3"/><path d="m15.2 13.9-.9-.3"/><path d="m16.6 18.7.3-.9"/><path d="m19.1 12.2.3-.9"/><path d="m19.6 18.7-.4-1"/><path d="m16.8 12.3-.4-1"/><path d="m14.3 16.6 1-.4"/><path d="m20.7 13.8 1-.4"/>
              </svg>
              <span className={styles["link-name"]}>Manage Users</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="manage-claims">
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
              <span className={styles["link-name"]}>Manage Claims</span>
            </NavLink>
          </li>
          
          <li>
            <NavLink to="/manage-documents">
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
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/><path d="M8 7h6"/><path d="M8 11h8"/>
              </svg>

              
              <span className={styles["link-name"]}>Manage Documents</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/manage-policies">
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
                <path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4"/><path d="M19 17V5a2 2 0 0 0-2-2H4"/><path d="M15 8h-5"/><path d="M15 12h-5"/>
              </svg>

              
              <span className={styles["link-name"]}>Manage Policies</span>
            </NavLink>
          </li>
        </ul>
      </div>

      <div className={styles["nav-bottom-container"]}>
   
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
  )
}

export default AdminNav