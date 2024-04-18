import React from "react";
import styles from "./WhyCybsure.module.scss";

const WhyCybsure = () => {
  return (
    <div className={styles["main-container"]}>
      <div className={styles["inner-container"]}>
        <h1>
          Why CybSure?

        </h1>
        <div className={styles["cards-container"]}>
            <div className={styles["card"]}>
                <h2>Over 3 million Customers</h2>
            </div>
            <div className={styles["card"]}>
                <h2>Claims support</h2>
            </div>
            <div className={styles["card"]}>
                <h2>Great Price</h2>
            </div>
        </div>

      </div>
    </div>
  );
};

export default WhyCybsure;
