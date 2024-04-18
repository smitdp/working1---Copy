import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';
import { baseURL } from '../../../Server';
import './ClaimAnalytics.css'

const getStatusString = (statusCode) => {
  switch (statusCode) {
    case 1:
      return 'Pending';
    case 2:
      return 'Under Review';
    case 3:
      return 'Approved';
    case 4:
      return 'Denied';
    case 5:
      return 'Processing';
    case 6:
      return 'Done';
    case 7:
      return 'Closed';
    default:
      return 'Unknown';
  }
};

const ClaimsList = ({ claims }) => {
  return (
    <div>
      <h2>Claims</h2>
      <ul>
        {claims.map(claim => (
          <li key={claim.claimId}>
            {claim.claimId} - {getStatusString(claim.claimStatus)}
          </li>
        ))}
      </ul>
    </div>
  );
};

const ClaimStatusChart = ({ claims }) => {
  const statusCounts = claims.reduce((acc, claim) => {
    const status = getStatusString(claim.claimStatus);
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(statusCounts).map(([status, count]) => ({
    status,
    count,
  }));

  return (
    <ResponsiveContainer width="50%" height={400}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 10,
          bottom: 5,
        }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="status" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

const App = () => {
  const [claims, setClaims] = useState([]);
  const [mostClaimedMonth, setMostClaimedMonth] = useState('');

  useEffect(() => {
    // Fetch data from API
    axios.get(`${baseURL}/claim`)
      .then(response => {
        setClaims(response.data);
        findMostClaimedMonth(response.data); // Find most claimed month
      })
      .catch(error => {
        console.error('Error fetching claims:', error);
      });
  }, []);

  const findMostClaimedMonth = (claims) => {
    const monthCounts = {};

    claims.forEach(claim => {
      const month = claim.incidentDate.split('-')[1]; // Extract month from "YYYY-MM-DD" format
      monthCounts[month] = (monthCounts[month] || 0) + 1;
    });

    const mostClaimedMonthIndex = Object.keys(monthCounts).reduce((a, b) => monthCounts[a] > monthCounts[b] ? a : b);
    const mostClaimedMonthName = new Date(2022, mostClaimedMonthIndex - 1, 1).toLocaleString('default', { month: 'long' });
    setMostClaimedMonth(mostClaimedMonthName);
  };

  const totalClaimsPurchased = claims.length; // Total number of claims purchased

  return (
    <div>
      <h1>Claim Analytics</h1>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Total Claims: </h5>
          <p className="card-text">{totalClaimsPurchased}</p>
        </div>
      </div>
      <div className="card mt-4">
        <div className="card-body">
          <h5 className="card-title">Most Claimed Month</h5>
          <p className="card-text">{mostClaimedMonth}</p>
        </div>
      </div>
      <ClaimStatusChart claims={claims} />
    </div>
  );
};

export default App;
