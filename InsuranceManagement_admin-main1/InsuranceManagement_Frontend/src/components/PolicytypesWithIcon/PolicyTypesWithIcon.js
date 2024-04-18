import React from "react";
import { Link } from "react-router-dom";
import styles from "./PolicyTypesWIthIcon.module.scss";
import img1 from "../../assets/Images/HealthIcon.png"
import img2 from "../../assets/Images/travelIcon.png"
import img3 from "../../assets/Images/lifeIcon.png"
import img4 from "../../assets/Images/homeIcon.png"
import img5 from "../../assets/Images/autoIcon.png"

const cardItems = [
  {imgurl:img1, title:"Health"},
  {imgurl:img2, title:"Travel"},
  {imgurl:img3, title:"Life"},
  {imgurl:img4, title:"Home"},
  {imgurl:img5, title:"Auto"},
]

const PolicyTypesWithIcon = () => {
  return (
    <div className={styles["outer-container"]}>
      <h2>Available Policies</h2>
      <div className={styles["main-container"]}>
      
      {cardItems.map((item, index) => (
        <Link to="/policies" key={index}>
          <div className={styles["card"]}>
            <div className={styles["img-container"]}>
              <img src={item.imgurl} alt={item.title} />
            </div>
            <span className={styles["title"]}>{item.title}</span>
          </div>
        </Link>
      ))}
    </div>
    </div>
  );
};

export default PolicyTypesWithIcon;
