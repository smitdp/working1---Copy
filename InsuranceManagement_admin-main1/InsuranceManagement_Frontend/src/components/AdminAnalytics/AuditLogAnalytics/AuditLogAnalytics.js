import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  FormControlLabel,
  Checkbox,
  Button,
} from '@mui/material';
import {XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar} from 'recharts';
import { baseURL } from '../../../Server';
import axios from 'axios';

const tableContainerStyle = {
  width: '80vw',
  margin: 'auto',
  marginTop: 20,
};

const rowsPerPage = 10;

export default function AuditLogAnalytics() {
  const [auditLogData, setAuditLogData] = useState([]);
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseURL + '/user/auditlogs');
        setAuditLogData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrderBy(property);
    setOrder(isAsc ? 'desc' : 'asc');
  };

  const handleCategoryChange = (category) => {
    if (filteredCategories.includes(category)) {
      setFilteredCategories(filteredCategories.filter((cat) => cat !== category));
    } else {
      setFilteredCategories([...filteredCategories, category]);
    }
  };

  const filteredData = auditLogData.filter((row) => {
    if (filteredCategories.length === 0) return true;
    return filteredCategories.includes(row.category);
  });

  const sortedData = filteredData.sort((a, b) => {
    if (order === 'asc') {
      return a[orderBy] > b[orderBy] ? 1 : -1;
    } else {
      return a[orderBy] < b[orderBy] ? 1 : -1;
    }
  });

  const pageCount = Math.ceil(sortedData.length / rowsPerPage);

  const handleNextPage = () => {
    setPage(Math.min(page + 1, pageCount - 1));
  };

  const handlePrevPage = () => {
    setPage(Math.max(page - 1, 0));
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentPageData = sortedData.slice(startIndex, endIndex);

  const actionDistribution = {};
  auditLogData.forEach((log) => {
    if (actionDistribution[log.action]) {
      actionDistribution[log.action]++;
    } else {
      actionDistribution[log.action] = 1;
    }
  });
  const actionDistributionData = Object.keys(actionDistribution).map((action) => ({
    action,
    count: actionDistribution[action],
  }));



  return (
    <>
      <div className="filter-container">
        <FormControlLabel
          control={<Checkbox checked={filteredCategories.includes('Auth')} onChange={() => handleCategoryChange('Auth')} />}
          label="Auth"
        />
        <FormControlLabel
          control={<Checkbox checked={filteredCategories.includes('Policy')} onChange={() => handleCategoryChange('Policy')} />}
          label="Policy"
        />
        <FormControlLabel
          control={<Checkbox checked={filteredCategories.includes('Claim')} onChange={() => handleCategoryChange('Claim')} />}
          label="Claim"
        />
      </div>
     
      <div>
        
        <BarChart width={800} height={300} data={actionDistributionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="action" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
       
      </div>
      <TableContainer component={Paper} style={tableContainerStyle}>
        <Table aria-label="audit log table">
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'userId'}
                  direction={orderBy === 'userId' ? order : 'asc'}
                  onClick={() => handleSort('userId')}
                >
                  User ID
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'userName'}
                  direction={orderBy === 'userName' ? order : 'asc'}
                  onClick={() => handleSort('userName')}
                >
                  User Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'timestamp'}
                  direction={orderBy === 'timestamp' ? order : 'asc'}
                  onClick={() => handleSort('timestamp')}
                >
                  Timestamp
                </TableSortLabel>
              </TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Details</TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'isSuccess'}
                  direction={orderBy === 'isSuccess' ? order : 'asc'}
                  onClick={() => handleSort('isSuccess')}
                >
                  Success
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPageData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.userId}</TableCell>
                <TableCell>{row.userName}</TableCell>
                <TableCell>{row.timestamp}</TableCell>
                <TableCell>{row.action}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.details}</TableCell>
                <TableCell>{row.isSuccess ? 'Yes' : 'No'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <Button onClick={handlePrevPage} disabled={page === 0}>Previous</Button>
        <span>{`Page ${page + 1} of ${pageCount}`}</span>
        <Button onClick={handleNextPage} disabled={page === pageCount - 1}>Next</Button>
      </div>
    </>
  );
}
