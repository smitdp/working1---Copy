import React from "react";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.scss";
import image1 from "../../assets/Images/LandingPageImages/image1.png";
import image2 from "../../assets/Images/LandingPageImages/image2.png";
import image3 from "../../assets/Images/LandingPageImages/image3.png";
import image4 from "../../assets/Images/LandingPageImages/image4.png";
import image5 from "../../assets/Images/LandingPageImages/image5.png";
import image6 from "../../assets/Images/LandingPageImages/image6.png";

const LandingPage = () => {
  const handleLogin = () => {};
  return (
    <div className={styles["landing-page-main-container"]}>
      <div className={styles["inner-container"]}>
        <div className={styles["image-container"]}>
          <div className={styles["image-relative-container"]}>
            <img src={image1} alt="image" />
            <img src={image2} alt="image" />
            <img src={image3} alt="image" />
            <img src={image4} alt="image" />
            <img src={image5} alt="image" />
            <img src={image6} alt="image" />
          </div>
        </div>
        <div className={styles["details-container"]}>
          <div className={styles["tagline"]}>
            Stay{" "}
            <span>
              Secure <br />
            </span>
            Stay{" "}
            <span>
              Assured <br />
            </span>
            With <span>CybSure</span>
          </div>
          <div className={styles["buttons-container"]}>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
