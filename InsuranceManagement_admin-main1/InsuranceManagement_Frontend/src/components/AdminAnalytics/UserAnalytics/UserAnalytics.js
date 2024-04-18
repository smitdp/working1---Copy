import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you're using Axios for HTTP requests
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import './UserAnalytics.css';
import { baseURL } from '../../../Server';

export default function UserAnalytics() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // Fetch user data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/user/users`);
        console.log("Fetched data:", response.data); // Log fetched data
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []); // Empty dependency array ensures the effect runs only once on mount

  // Calculate total users, claimants, and insurers
  const totalUsers = userData.length || 0; // Default to 0 if userData is empty
  const totalClaimants = userData.filter(Users => Users.roleName === 'Claimant').length;
  const totalInsurers = userData.filter(users => users.roleName === 'Agent').length;

  // Data for the PieChart
  const pieChartData = [
    { name: 'Claimants', value: totalClaimants },
    { name: 'Insurers', value: totalInsurers }
  ];

  // Custom colors for the pie chart
  const COLORS = ['#BC7FCD', '#FFCDEA'];

  // Custom label function to display percentage
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = 25 + innerRadius + (outerRadius - innerRadius);
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <>
      <h1>User Analytics</h1>
      <div>Total Users: {totalUsers}</div>

      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            dataKey="value"
            data={pieChartData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            labelLine={false}
            label={renderCustomizedLabel}
          >
            {pieChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
}
