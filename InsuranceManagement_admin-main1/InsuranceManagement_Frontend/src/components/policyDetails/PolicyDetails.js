import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./PolicyDetails.module.scss";
import { baseURL } from "../../Server";
import getCurrentUserId from "../../utils/getCurrentUserId";
import Swal from "sweetalert2";

const PolicyDetails = () => {
  const navigate = useNavigate();
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);

  const location = useLocation();
  const policy = location.state.policy;
  console.log(policy)
  const modalRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/user/agents`);
        setAgents(response.data);
      } catch (error) {
        console.error("Error fetching agents:", error);
      }
    };

    fetchData();
  }, []);

  const handleBuy = () => {
    
    setModalIsVisible(true);
  };

  const handleCancel = () => {
    setModalIsVisible(false);
  };

  const handleConfirm = async () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];

    if (selectedAgent) {
      const currentuserId = getCurrentUserId();
      const enrollmentDate = formattedDate;
      const policyDuration = policy.duration;

      // Calculate end date
      const endDate = new Date(enrollmentDate);
      endDate.setDate(endDate.getDate() + policyDuration);
      const formattedEndDate = endDate.toISOString().split("T")[0];

      const updatedBuyPolicyDetails = {
        agentId: selectedAgent,
        userId: Number(currentuserId),
        policyId: policy.id,
        enrollmentDate: enrollmentDate,
        endDate: formattedEndDate,
      };
      
      //post request for buy policy
      try {
        const response = await axios.post(
          `${baseURL}/user/buy-policy`,
          updatedBuyPolicyDetails
        );
        console.log("Policy purchase successful:", response.data);
        setModalIsVisible(false);
        const swal = await Swal.fire({
          position: "center",
          icon: "success",
          title: `Thank you for buying ${policy.policyName}!`,
          showConfirmButton: true,
          confirmButtonColor: 'rgb(112, 111, 239)',
        });
        swal.isConfirmed && navigate("/policies");
      } catch (error) {
        console.error("Error purchasing policy:", error);
        const swal = await Swal.fire({
          position: "center",
          icon: "error",
          title: error.response.data,
          showConfirmButton: true,
          confirmButtonColor: 'rgb(112, 111, 239)',
        });
        swal.isConfirmed && navigate('/policies')
      }
    } else {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: `Please select an agent.`,
        showConfirmButton: true,
        confirmButtonColor: 'rgb(112, 111, 239)',
      });
    }
  };

  const handleAgentChange = (event) => {
    setSelectedAgent(event.target.value);
  };

  return (
    <div className={styles["main-container"]}>
      {policy ? (
        <div className={styles["grid-container"]}>
          <p className={styles["policy-number"]}>
            Policy Number<br />
            <span className={styles["bold"]}>{policy.policyNumber}</span>
          </p>
          <p className={styles["policy-type"]}>
            Policy Type<br /> <span className={styles["bold"]}>{policy.policyTypeName}</span>
          </p>
          <p className={styles["policy-name"]}>
            Policy Name<br /> <span className={styles["bold"]}>{policy.policyName}</span>
          </p>
          <p className={styles["policy-description"]}>
            Description<br /> <span className={styles["bold"]}>{policy.description}</span>
          </p>
          <p className={styles["policy-duration"]}>
            Duration<br /> <span className={styles["bold"]}>{policy.duration} Days</span>
          </p>
          <p className={styles["policy-installment"]}>
            Installment<br /> <span className={styles["bold"]}>₹ {policy.installment}</span>
          </p>
          <p className={styles["policy-premium"]}>
            Premium amount<br /> <span className={styles["bold"]}>₹ {policy.premiumAmount} </span>
          </p>
        </div>
      ) : (
        <div>No policy data available</div>
      )}
          <button className={styles["buy-button"]} onClick={handleBuy}>
            Buy Policy
          </button>
      {modalIsVisible && (
        <div className={styles.modalOverlay} ref={modalRef}>
          <div className={styles.modalContent}>
            <h2>Select Agent</h2>
            <p>
              {policy.policyNumber} : {policy.policyName}
            </p>

            <select onChange={handleAgentChange}>
              <option value="">Select Agent</option>
              {agents.map((agent) => (
                <option key={agent.id} value={agent.id}>
                  {`${agent.firstName} ${agent.firstName}`}
                </option>
              ))}
            </select>
            <div className={styles["button-container"]}>
              <button onClick={handleConfirm}>Confirm</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PolicyDetails;
