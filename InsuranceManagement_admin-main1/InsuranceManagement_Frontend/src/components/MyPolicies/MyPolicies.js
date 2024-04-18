import React, { useEffect, useState } from "react";
import { baseURL } from "../../Server";
import axios from "axios";
import getCurrentUserId from "../../utils/getCurrentUserId";
import { Navigate, useNavigate } from "react-router-dom";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import styles from "./MyPolicies.module.scss";
import ClaimStatus from "../ClaimStatus/ClaimStatus";

const MyPolicies = () => {
  const [myPolicies, setMyPolicies] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const userId = getCurrentUserId();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [currentPolicyStatus, setCurrentPolicyStatus] = useState();

  const[statusIsOpen, setStatusIsOpen] = useState(false);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/user/my-policies/${userId}`
        );
        setMyPolicies(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchPolicies();
  }, []);

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortOrder === "asc";
    setSortOrder(isAsc ? "desc" : "asc");
    setSortBy(property);
    const sortedPolicies = [...myPolicies].sort((a, b) => {
      if (isAsc) {
        return a[property] < b[property] ? -1 : 1;
      } else {
        return a[property] > b[property] ? -1 : 1;
      }
    });
    setMyPolicies(sortedPolicies);
  };

  const handleClaimClick = (policy) => {
    navigate("/claim", { state: { policy: policy } });
  };

  const handleStatusClick = (policy) => {
    setCurrentPolicyStatus(policy.status);
    setStatusIsOpen(true);
  };

  const handleCallAgentClick = (policy) => {
    setSelectedPolicy(policy);
    setOpenDialog(true);
  };

  const handleEmailAgentClick = (email) => {
    window.location.href = `mailto:${email}`;
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div className={styles["main-container"]}>
      <h1>My Policies</h1>
      {myPolicies.length ? (
        <Table sx={{ background: "white", borderRadius: "1rem", overflow: "hidden" }}>
          <TableHead sx={{ background: "rgba(112,111,239,1)" }}>
            <TableRow className={styles["table-header"]}>
              <TableCell sx={{ color: "white" }}>
                <TableSortLabel
                  active={sortBy === "policyName"}
                  direction={sortOrder}
                  onClick={() => handleSort("policyName")}
                >
                  Policy Name
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ color: "white" }}>
                <TableSortLabel
                  active={sortBy === "policyTypeName"}
                  direction={sortOrder}
                  onClick={() => handleSort("policyTypeName")}
                >
                  Policy Type Name
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ color: "white" }}>
                <TableSortLabel
                  active={sortBy === "enrollmentDate"}
                  direction={sortOrder}
                  onClick={() => handleSort("enrollmentDate")}
                >
                  Enrollment Date
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ color: "white" }}>
                <TableSortLabel
                  active={sortBy === "endDate"}
                  direction={sortOrder}
                  onClick={() => handleSort("endDate")}
                >
                  End Date
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ color: "white" }}>
                <TableSortLabel
                  active={sortBy === "installment"}
                  direction={sortOrder}
                  onClick={() => handleSort("installment")}
                >
                  Installment
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ color: "white" }}>
                <TableSortLabel
                  active={sortBy === "premiumAmount"}
                  direction={sortOrder}
                  onClick={() => handleSort("premiumAmount")}
                >
                  Premium Amount
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ color: "white" }}>Actions</TableCell>
              <TableCell sx={{ color: "white" }}>Call Agent</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {myPolicies.map((policy, index) => (
              <TableRow key={index} className={index % 2 === 0 ? styles["table-row-even"] : styles["table-row-odd"]}>
                <TableCell>{policy.policyName}</TableCell>
                <TableCell>{policy.policyTypeName}</TableCell>
                <TableCell>{policy.enrollmentDate}</TableCell>
                <TableCell>{policy.endDate}</TableCell>
                <TableCell>{policy.installment}</TableCell>
                <TableCell>{policy.premiumAmount}</TableCell>
                <TableCell>
                  {!policy.isClaimed ? (
                    <Button onClick={() => handleClaimClick(policy)}>
                      Claim
                    </Button>
                  ) : (
                    <Button onClick={() => handleStatusClick(policy)}>
                      Status
                    </Button>
                  )}
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleCallAgentClick(policy)}>
                    Contact Agent
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div>You haven't bought any policy !!</div>
      )}

      {/* Dialog for agent details */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Agent Details</DialogTitle>
        <DialogContent>
          {selectedPolicy && (
            <div>
              <p>Agent: {selectedPolicy.agentName}</p>
              <br />
              <Button variant="outlined" style={{ marginRight: "1rem" }}>Call Agent</Button>
              <Button variant="outlined" onClick={() => handleEmailAgentClick(selectedPolicy.agentEmail)}>Email Agent</Button>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {statusIsOpen && <ClaimStatus currentStatus = {currentPolicyStatus}/>}
      
    </div>
  );
};

export default MyPolicies;
