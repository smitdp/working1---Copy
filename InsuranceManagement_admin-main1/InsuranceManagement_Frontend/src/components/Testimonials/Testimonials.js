import React from "react";
import styles from "./Testimonials.module.scss";

const list = [
  {
    name: "Emma Stone",
    details: "I did not even need help from an agent ! This is very good.",
    imgUrl:
      "https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg?t=st=1713163389~exp=1713166989~hmac=6a1709115b4d73f1d6ba3e08dd32d2b1395ad9c773b01a86c621252b1c7cbdb5&w=1380",
  },
  {
    name: "Chris Evans",
    details:
      "You are doing a great job. Proud to be a customer of Policybazaar.",
    imgUrl:
      "https://img.freepik.com/free-photo/confident-handsome-guy-posing-against-white-wall_176420-32936.jpg?t=st=1713163552~exp=1713167152~hmac=e0d23b8c6c08615885810a05bbf2837db5d1bcc7ea9d41b5cb9c5bc8a37bf0fd&w=1380",
  },
  {
    name: "Elle Fanning",
    details:
      "The services provided by CybSure are extremely helpful in making the right choice. Overall I had a good experience with Cybsure.",
    imgUrl:
      "https://img.freepik.com/free-photo/indoor-shot-attractive-young-woman-with-glasses-posing-against-white-wall_273609-20347.jpg?t=st=1713163503~exp=1713167103~hmac=e5e6d519a1bb4a98a7046975837ada11ef924d413af57158810d292dee66fb5a&w=1380",
  },
  {
    name: "Ana De Armas",
    details:
      "Thanking you very much for your support for getting our policy quickly, I would appreciate your work.",
    imgUrl:
      "https://img.freepik.com/free-photo/pretty-smiling-joyfully-female-with-fair-hair-dressed-casually-looking-with-satisfaction_176420-15187.jpg?t=st=1713163526~exp=1713167126~hmac=ff72165d8e36c3b70060ca082ce24193a7fd3caa7ab4b1a2bbba4898f84169ff&w=1380",
  },
];
const Testimonials = () => {
  return (
    <div className={styles["main-container"]}>
      <div className={styles["title"]}>What our customers are saying </div>
      <div className={styles["cards-container"]}>
        {list.map((item) => (
          <div className={styles["card"]} key={item.imgUrl}>
            <div className={styles["img-container"]}>
              <img src={item.imgUrl} />
            </div>
            <div className={styles["details"]}>
              <p>{item.name}</p>
              <p>{item.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
