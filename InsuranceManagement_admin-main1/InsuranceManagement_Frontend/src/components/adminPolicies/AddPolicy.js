import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../Server";

const token = localStorage.getItem("login");

const AddPolicies = () => {
    const [newPolicyData, setNewPolicyData] = useState({
        policyNumber: "",
        policyTypeID: 1,
        policyName: "",
        duration: 0,
        description: "",
        installment: 0,
        premiumAmount: 0,
        requiredDocuments: ""
    });
    const [policyTypes, setPolicyTypes] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchPolicyTypes = async () => {
            try {
                const response = await axios.get(`${baseURL}/policy/policy-types`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log(response);
                setPolicyTypes(response.data.result);
            } catch (error) {
                console.log("Error fetching policy types:", error.message);
            }
        };

        fetchPolicyTypes();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPolicyData({
            ...newPolicyData,
            [name]: value
        });
    };

    const validateForm = () => {
        let errors = {};
        let isValid = true;

        if (!newPolicyData.policyNumber.trim()) {
            errors.policyNumber = "Policy number is required";
            isValid = false;
        }

        if (!newPolicyData.policyTypeID) {
            errors.policyTypeID = "Policy type is required";
            isValid = false;
        }

        if (!newPolicyData.policyName.trim()) {
            errors.policyName = "Policy name is required";
            isValid = false;
        }

        if (!newPolicyData.duration.toString().trim()) {
            errors.duration = "Duration is required";
            isValid = false;
        }

        if (!newPolicyData.description.trim()) {
            errors.description = "Description is required";
            isValid = false;
        }

        if (!newPolicyData.installment.toString().trim()) {
            errors.installment = "Installment is required";
            isValid = false;
        }

        if (!newPolicyData.premiumAmount.toString().trim()) {
            errors.premiumAmount = "Premium amount is required";
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const handleAddPolicy = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                console.log(newPolicyData)
                const response = await axios.post(`${baseURL}/policy/add-policy`, newPolicyData);

                console.log("Policy added successfully:", response.data);

                setNewPolicyData({
                    policyNumber: "",
                    policyTypeID: 0,
                    policyName: "",
                    duration: 0,
                    description: "",
                    installment: 0,
                    premiumAmount: 0,
                    requiredDocuments: ""
                });
            } catch (error) {
                console.log("Error adding policy:", error.message);
            }
        }
    };

    return (
        <div>
            <h1>Add Policy</h1>
            <form onSubmit={handleAddPolicy}>
                <div>
                    Policy Number:
                    <input
                        type="text"
                        name="policyNumber"
                        value={newPolicyData.policyNumber}
                        onChange={handleInputChange}
                        required
                    />
                    {errors.policyNumber && <div>{errors.policyNumber}</div>}
                </div>
                <div>
                    Policy Type:
                    <select
                        name="policyTypeID"
                        value={newPolicyData.policyTypeID}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select Policy Type</option>
                        {policyTypes.map(policyType => (
                            <option key={policyType.id} value={policyType.id}>
                                {policyType.policyTypeName}
                            </option>
                        ))}
                    </select>

                    {errors.policyTypeID && <div>{errors.policyTypeID}</div>}
                </div>
                <div>
                    Policy Name:
                    <input
                        type="text"
                        name="policyName"
                        value={newPolicyData.policyName}
                        onChange={handleInputChange}
                        required
                    />
                    {errors.policyName && <div>{errors.policyName}</div>}
                </div>
                <div>
                    Duration:
                    <input
                        type="number"
                        name="duration"
                        value={newPolicyData.duration}
                        onChange={handleInputChange}
                        required
                    />
                    {errors.duration && <div>{errors.duration}</div>}
                </div>
                <div>
                    Description:
                    <input
                        type="text"
                        name="description"
                        value={newPolicyData.description}
                        onChange={handleInputChange}
                        required
                    />
                    {errors.description && <div>{errors.description}</div>}
                </div>
                <div>
                    Installment:
                    <input
                        type="number"
                        name="installment"
                        value={newPolicyData.installment}
                        onChange={handleInputChange}
                        required
                    />
                    {errors.installment && <div>{errors.installment}</div>}
                </div>
                <div>
                    Premium Amount:
                    <input
                        type="number"
                        name="premiumAmount"
                        value={newPolicyData.premiumAmount}
                        onChange={handleInputChange}
                        required
                    />
                    {errors.premiumAmount && <div>{errors.premiumAmount}</div>}
                </div>
                <div>
                    Required Documents:
                    <textarea
                        name="requiredDocuments"
                        value={newPolicyData.requiredDocuments}
                        onChange={handleInputChange}
                        required
                    />
                    {errors.requiredDocuments && (
                        <div>{errors.requiredDocuments}</div>
                    )}
                </div>

                <button type="submit">Add Policy</button>
            </form>
        </div>
    );
};

export default AddPolicies;
