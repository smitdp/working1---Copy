import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, TableSortLabel } from '@mui/material';
import { baseURL } from "../../Server";

const UserPoliciesTable = () => {
    const [userPolicies, setUserPolicies] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const token = localStorage.getItem("login");

    useEffect(() => {
        const fetchUserPolicies = async () => {
            try {
                const response = await axios.get(`${baseURL}/policy/user-policies`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUserPolicies(response.data);
            } catch (error) {
                console.error('Error fetching user policies:', error);
            }
        };

        fetchUserPolicies();
    }, [token]);

    const filteredUserPolicies = userPolicies.filter(userPolicy =>
        userPolicy.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        userPolicy.policyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        userPolicy.agentName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedUserPolicies = filteredUserPolicies.slice().sort((a, b) => {
        if (sortColumn) {
            const aValue = a[sortColumn];
            const bValue = b[sortColumn];
            if (sortOrder === 'asc') {
                return aValue.localeCompare(bValue);
            } else {
                return bValue.localeCompare(aValue);
            }
        }
        return 0;
    });

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortOrder('asc');
        }
    };

    return (
        <div>
            <h2>User Policies</h2>
            <TextField
                label="Search"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearchChange}
                fullWidth
                margin="normal"
            />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <TableSortLabel
                                    active={sortColumn === 'userName'}
                                    direction={sortOrder}
                                    onClick={() => handleSort('userName')}
                                >
                                    User Name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={sortColumn === 'policyName'}
                                    direction={sortOrder}
                                    onClick={() => handleSort('policyName')}
                                >
                                    Policy Name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={sortColumn === 'agentName'}
                                    direction={sortOrder}
                                    onClick={() => handleSort('agentName')}
                                >
                                    Agent Name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={sortColumn === 'enrollmentDate'}
                                    direction={sortOrder}
                                    onClick={() => handleSort('enrollmentDate')}
                                >
                                    Enrollment Date
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={sortColumn === 'endDate'}
                                    direction={sortOrder}
                                    onClick={() => handleSort('endDate')}
                                >
                                    End Date
                                </TableSortLabel>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedUserPolicies.map((userPolicy) => (
                            <TableRow key={userPolicy.ID}>
                                <TableCell>{userPolicy.userName}</TableCell>
                                <TableCell>{userPolicy.policyName}</TableCell>
                                <TableCell>{userPolicy.agentName}</TableCell>
                                <TableCell>{userPolicy.enrollmentDate}</TableCell>
                                <TableCell>{userPolicy.endDate}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default UserPoliciesTable;

