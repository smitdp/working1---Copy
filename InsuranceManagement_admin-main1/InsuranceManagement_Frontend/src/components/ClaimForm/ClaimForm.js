import React, { useState, useCallback } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { baseURL } from "../../Server";
import styles from "./ClaimForm.module.scss";
import Loader from "../Loader/Loader";
import Swal from "sweetalert2";

const ClaimForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const policyDetails = location.state.policy;
  const [formData, setFormData] = useState({
    policyId: policyDetails.policyId,
    userId: policyDetails.userId,
    incidentDate: "",
    incidentLocation: "",
    address: "",
    description: "",
    status: 1,
    documents: Array(policyDetails.documentsNeeded.length).fill(null),
  });
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e, index) => {
    setIsLoading(true)
    const fileData = new FormData();
    fileData.append("file", e.target.files[0]);
    try {

      const response = await axios.post(`${baseURL}/claim/upload`, fileData);
      const newFiles = [...formData.documents];
      newFiles[index] = response.data.url;
      console.log(response);
      setFormData((prevFormData) => ({
        ...prevFormData,
        documents: newFiles,
      }));
    } catch (error) {
      setIsLoading(true)
      console.error("Error uploading file:", error);
      // Handle error, show error message, etc.
    }finally{
      setIsLoading(false)
    }
  };

  const handleNext = async () => {
    if (step === 1) {
      if (
        !formData.incidentDate ||
        !formData.incidentLocation ||
        !formData.address ||
        !formData.description
      ) {
        const swal = await Swal.fire({
          position: "center",
          icon: "warning",
          title: `Please fill in all the required fields.`,
          showConfirmButton: true,
          confirmButtonColor: 'rgb(112, 111, 239)',
        });
      }

      const currentDate = new Date().toISOString().split("T")[0];
      if (formData.incidentDate > currentDate) {
        const swal = await Swal.fire({
          position: "center",
          icon: "warning",
          title: `Incident date cannot be in the future.`,
          showConfirmButton: true,
          confirmButtonColor: 'rgb(112, 111, 239)',
        });
        return;
      }

      setStep(step + 1);
    } else if (step === 2) {
      if (formData.documents.some((file) => !file)) {
        const swal = await Swal.fire({
          position: "center",
          icon: "warning",
          title: `Please upload all files.`,
          showConfirmButton: true,
          confirmButtonColor: 'rgb(112, 111, 239)',
        });
        return;
      }

      setStep(step + 1);
    }
  };

  const openFile = useCallback((filePath) => {
    window.open(filePath, "_blank");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseURL}/claim/claims`, formData);
      const swal = await Swal.fire({
        position: "center",
        icon: "success",
        title: `You have successfully claimed the policy.`,
        text: `Policy name: ${policyDetails.policyName}`,
        showConfirmButton: true,
        confirmButtonColor: 'rgb(112, 111, 239)',
      });
      navigate("/home"); // Navigate to homepage
    } catch (error) {
      const swal = await Swal.fire({
        position: "center",
        icon: "error",
        title: `Policy claim failed. Try again later.`,
        text: `Policy name: ${policyDetails.policyName}`,
        showConfirmButton: true,
        confirmButtonColor: 'rgb(112, 111, 239)',
      });
    }
  };

  return (
    <div className={styles["main-container"]}>
      <form onSubmit={handleSubmit} className={styles["form"]}>
        {step === 1 && (
          <>
            <h2>Claim Form</h2>
            <div>
              <label>Incident Date</label>
              <input
                type="date"
                name="incidentDate"
                value={formData.incidentDate}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Incident Location</label>
              <input
                type="text"
                name="incidentLocation"
                value={formData.incidentLocation}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Your address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Incident description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
            
            <button type="button" onClick={handleNext}>
              Next
            </button>
          </>
        )}
        {step === 2 && (
          <>
          {isLoading && <Loader />}
            <h2>Upload documents</h2>
            {policyDetails.documentsNeeded.map((document, index) => (
              <div key={index}>
                <label>{document}</label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, index)}
                  required
                  className={styles["custom-file-input"]}
                  accept=".pdf"
                />
              </div>
            ))}
            <br />
            <button className={styles["secondary-button"]} style={{marginRight:"2rem"}} type="button" onClick={() => setStep(step - 1) }>
              Back
            </button>
            <button type="button" onClick={handleNext}>
              Next
            </button>
          </>
        )}
       {step === 3 && (
  <>
    <h2>Confirm details</h2>
    <p>Incident Date: {formData.incidentDate}</p>
    <p>Incident Location: {formData.incidentLocation}</p>
    <p>Address: {formData.address}</p>
    <p>Description: {formData.description}</p>
    <h4>Uploaded Files</h4>
    <ul>
      {formData.documents.map((file, index) => (
        <li key={index}>
          {policyDetails.documentsNeeded[index]} {/* Display document required name */}
          {formData.documents[index] && (
            <>
              <button
                type="button"
                onClick={() => openFile(formData.documents[index])}
                className={styles["secondary-button"]}
              >
                Open File
              </button>
             
            </>
          )}
        </li>
      ))}
    </ul>
    
    <button
      type="button"
      className={styles["secondary-button"]}
      onClick={() => setStep(step - 1)}
      style={{marginRight:"2rem", marginTop:"2rem", marginBottom:"1rem"}}
    >
      Back
    </button>
    <button type="submit">Submit Claim</button>
  </>
)}

      </form>
    </div>
  );
};

export default ClaimForm;
