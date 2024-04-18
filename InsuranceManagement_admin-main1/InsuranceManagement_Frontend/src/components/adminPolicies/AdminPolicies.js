import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseURL } from "../../Server";
import axios from "axios";
import {
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    FormControl,
    FormLabel,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TableSortLabel,
} from "@mui/material";

const AdminPolicies = () => {
    const [policies, setPolicies] = useState([]);
    const [policyTypes, setPolicyTypes] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");
    const token = localStorage.getItem("login");

    useEffect(() => {
        const fetchPolicies = async () => {
            try {
                const response = await axios.get(`${baseURL}/policy`, {
                    headers: { Authorization: `Bearer ${token}`, credentials: true },
                });
                setPolicies(response.data);
                const types = Array.from(new Set(response.data.map((policy) => policy.policyTypeName)));
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

    const handleSort = (property) => {
        const isAsc = sortBy === property && sortOrder === "asc";
        setSortOrder(isAsc ? "desc" : "asc");
        setSortBy(property);
        const sortedPolicies = [...policies].sort((a, b) => {
            if (isAsc) {
                return a[property] < b[property] ? -1 : 1;
            } else {
                return a[property] > b[property] ? -1 : 1;
            }
        });
        setPolicies(sortedPolicies);
    };

    const filteredPolicies =
        selectedTypes.length === 0
            ? policies
            : policies.filter((policy) => selectedTypes.includes(policy.policyTypeName));

    return (
        <div className="admin-container">
            <h1>Policies</h1>
            <Link to="add-policy">
                <Button variant="contained" color="primary">
                    Add Policy
                </Button>
            </Link>
            &nbsp;
            <Button variant="contained" color="secondary" onClick={handleClearFilter}>
                Clear Filter
            </Button>
            <br />
            <br />
            <FormControl component="fieldset">
                <FormLabel component="legend">Filter by Policy Type:</FormLabel>
                <FormGroup>
                    {policyTypes.map((type) => (
                        <FormControlLabel
                            key={type}
                            control={<Checkbox checked={selectedTypes.includes(type)} onChange={() => handleTypeChange(type)} />}
                            label={type}
                        />
                    ))}
                </FormGroup>
            </FormControl>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <TableSortLabel
                                    active={sortBy === "policyName"}
                                    direction={sortOrder}
                                    onClick={() => handleSort("policyName")}
                                >
                                    Policy Name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={sortBy === "policyTypeName"}
                                    direction={sortOrder}
                                    onClick={() => handleSort("policyTypeName")}
                                >
                                    Policy Type Name
                                </TableSortLabel>
                            </TableCell>
                            {/* Add more table headers as needed */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredPolicies.map((policy) => (
                            <TableRow key={policy.id}>
                                <TableCell>{policy.policyName}</TableCell>
                                <TableCell>{policy.policyTypeName}</TableCell>
                                {/* Add more table cells as needed */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default AdminPolicies;
