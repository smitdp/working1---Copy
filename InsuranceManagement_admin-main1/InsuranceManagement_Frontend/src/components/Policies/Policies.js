import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseURL } from "../../Server";
import axios from "axios";
import styles from "./Policies.module.scss";
import PoliciesHeroSection from "../PoliciesHeroSection/PoliciesHeroSection";

const Policies = () => {
  const [policies, setPolicies] = useState([]);
  const [policyTypes, setPolicyTypes] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const token = localStorage.getItem("login");

  const poliycImages = [
    "https://img.freepik.com/free-photo/safe-rooftop-their-new-home_637285-12442.jpg?t=st=1712986372~exp=1712989972~hmac=dcc461bbcf0bcc2af4e4e3c1ad64e69023343a3e56df748e6b0bd45cda85b377&w=996",
    "https://img.freepik.com/free-photo/family-moving-using-boxes_1157-35481.jpg?t=st=1712985489~exp=1712989089~hmac=69ef41eff978ae73e12958aa1fb1e8404027e2b5a52f0955a1e8cdec28f85899&w=996",
    "https://img.freepik.com/free-photo/close-up-hands-holding-red-heart_23-2149191407.jpg?t=st=1712985519~exp=1712989119~hmac=3e60d3549e9d26074abf9d14741839dd0932a6f59af370a3dfe63d7bd29e88fc&w=996",
    "https://img.freepik.com/free-photo/top-view-family-figure-with-chalk-concept_23-2148488284.jpg?t=st=1713013736~exp=1713017336~hmac=c0d170d704a04e18fb6b63b9cfd9a96284426337a4cd2a9093c3418058a9376c&w=996",
    "https://img.freepik.com/free-photo/car-doctor-with-stethoscope-car-showroom_1303-17833.jpg?t=st=1713013861~exp=1713017461~hmac=2e10e1e7f5cc0c082bb58d71df4e66292b37c7db126b7af793747afc17b13061&w=996",
    "https://img.freepik.com/free-photo/side-view-man-checking-engine_23-2148258008.jpg?t=st=1713013899~exp=1713017499~hmac=0d97b725e19630b2b4bd53f416653ad8cf30c5c5212030396e82c5fdb46cff65&w=996",
    "https://img.freepik.com/free-photo/protect-your-house_1150-12788.jpg?t=st=1713013940~exp=1713017540~hmac=fa85a87803b01f3f5b5721a6b37b4b5c7353b14bd523c1e7f241ed080f9458f3&w=996",
    "https://img.freepik.com/free-psd/3d-rendering-parts-house_23-2150123670.jpg?t=st=1713013990~exp=1713017590~hmac=d20167e08db250e5e0182b82dfe3113d0b6762a57e54ba17d537ecef072600fb&w=996",
    "https://img.freepik.com/free-photo/woman-with-suitcase-airport_1157-33915.jpg?t=st=1713014041~exp=1713017641~hmac=1a88f6393f6bf812b5a4910ceac1bd993e0b616dc05ada233e05d7ebef958c5c&w=996",
    "https://img.freepik.com/free-photo/close-up-people-traveling-together_23-2149272140.jpg?t=st=1713014058~exp=1713017658~hmac=5b01eefbed434b2b439f49d9ba4510ee53e2348ec9cbe299ba97bea6f2c7aee2&w=996",
  ];
  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await axios.get(`${baseURL}/policy`, {
          headers: { Authorization: `Bearer ${token}`, credentials: true },
        });
        setPolicies(response.data);
        const types = Array.from(
          new Set(response.data.map((policy) => policy.policyTypeName))
        );
        setPolicyTypes(types);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchPolicies();
  }, []);

  const handleTypeChange = (type) => {
    const updatedTypes = [...selectedTypes];
    const index = updatedTypes.indexOf(type);
    if (index !== -1) {
      updatedTypes.splice(index, 1);
    } else {
      updatedTypes.push(type);
    }
    setSelectedTypes(updatedTypes);
  };

  const handleClearFilter = () => {
    setSelectedTypes([]);
  };

  const filteredPolicies =
    selectedTypes.length === 0
      ? policies
      : policies.filter((policy) =>
          selectedTypes.includes(policy.policyTypeName)
        );

  return (
    <div>
      <PoliciesHeroSection />
      <div className={styles["filter-container"]}>
        <div className={styles["filter-container-inner"]}>
          <h4>Filter by policy type</h4>
          <div className={styles["checkboxes-container"]}>
            {policyTypes.map((type) => (
              <div className={styles["checkbox-container"]} key={type}>
                <div className="checkbox-wrapper" >
                  <input
                    id={`_checkbox-${type}`}
                    type="checkbox"
                    value={type}
                    checked={selectedTypes.includes(type)}
                    onChange={() => handleTypeChange(type)}
                    className="checkbox-input"
                  />
                  <label
                    htmlFor={`_checkbox-${type}`}
                    className="checkbox-label"
                  >
                    <div className="tick_mark"></div>
                  </label>
                </div>
                {type}
              </div>
            ))}
            <button onClick={handleClearFilter}>Clear Filter</button>
          </div>
        </div>
      </div>

      <ul className={styles["policy-cards-container"]}>
        {filteredPolicies.map((policy, index) => (
          <li key={policy.id} className={styles["policy-card"]}>
            <div className={styles["img-container"]}>
              <img src={poliycImages[index]} />
            </div>

            <div className={styles["details-container"]}>
              <div className={styles["details"]}>
                <h3>{policy.policyName}</h3>
                <p>{`${policy.policyTypeName} insurance`}</p>
              </div>
              <Link to={"/policy"} state={{ policy: policy }}>
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
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                </svg>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Policies;
