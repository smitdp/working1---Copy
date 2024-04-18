import './PolicyAnalytics.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, BarChart, CartesianGrid, Pie,XAxis, YAxis, Bar, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { baseURL } from '../../../Server';

export default function PolicyAnalytics() {
  const [policyTypesData, setPolicyTypesData] = useState([]);
  const [totalPoliciesSold, setTotalPoliciesSold] = useState(0);
  const [averageInstallment, setAverageInstallment] = useState(0);
  const [averagePremiumAmount, setAveragePremiumAmount] = useState(0);
  const [averageDuration, setAverageDuration] = useState(0);
  const [policyNameFrequency, setPolicyNameFrequency] = useState({});
  const [userListResponse, setUserListResponse] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userPolicyListResponse = await axios.get(baseURL + '/policy/user-policies');
        const policyListResponse = await axios.get(baseURL + '/policy');
        setUserListResponse(userPolicyListResponse.data);

        const { policyTypesCount } = countPolicyTypes(policyListResponse.data);
        setPolicyTypesData(policyTypesCount);

        const totalInstallment = policyListResponse.data.reduce((acc, policy) => acc + policy.installment, 0);
        const totalPremiumAmount = policyListResponse.data.reduce((acc, policy) => acc + policy.premiumAmount, 0);
        const totalDuration = policyListResponse.data.reduce((acc, policy) => acc + policy.duration, 0);
        const totalPolicies = policyListResponse.data.length;
        const averageInstallment = totalInstallment / totalPolicies;
        const averagePremiumAmount = totalPremiumAmount / totalPolicies;
        const averageDuration = totalDuration / totalPolicies;

        setTotalPoliciesSold(userPolicyListResponse.data.length);
        setAverageInstallment(Math.floor(averageInstallment)); // Round to 2 decimal places
        setAveragePremiumAmount(Math.floor(averagePremiumAmount)); // Round to 2 decimal places
        setAverageDuration(Math.floor(averageDuration)); // Round to 2 decimal places
        calculatePolicyNameFrequency(userPolicyListResponse.data);
      } catch (error) {
        console.log(error)
      }
    };

    fetchData();
  }, []);

  // Function to count the number of policies for each type
  function countPolicyTypes(policyList) {
    const policyTypesCount = {};

    // Initialize policyTypesCount with each type
    policyList.forEach(policy => {
      const policyType = policy.policyTypeName;
      policyTypesCount[policyType] = (policyTypesCount[policyType] || 0) + 1;
    });

    // Convert policyTypesCount to array of objects
    const result = Object.keys(policyTypesCount).map(policyType => ({
      name: policyType,
      value: policyTypesCount[policyType]
    }));

    return { policyTypesCount: result };
  }

  // Function to calculate the frequency of each policy name
  function calculatePolicyNameFrequency(userPolicyList) {
    const policyNameFrequency = {};

    // Iterate through the user policy list and count the occurrences of each policy name
    userPolicyList.forEach(policy => {
      const policyName = policy.policyName;
      policyNameFrequency[policyName] = (policyNameFrequency[policyName] || 0) + 1;
    });

    setPolicyNameFrequency(policyNameFrequency);
  }
  console.log(policyNameFrequency)

  return (
    <div>
      <h2>Policy Types Distribution</h2>
      <p>Total number of policies sold: {totalPoliciesSold}</p>
      <p>Average installment amount: ₹{averageInstallment}</p>
      <p>Average premium amount: ₹{averagePremiumAmount}</p>
      <p>Average duration of policy: {averageDuration} days</p>
      <ResponsiveContainer width="80%" height={400}>
        <PieChart>
          <Pie data={policyTypesData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label />
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      
        <ResponsiveContainer width="80%" height={400}>
      <BarChart
        data={Object.entries(policyNameFrequency).map(([policyName, frequency]) => ({ name: policyName, frequency }))}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="frequency" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
    </div>
  );
}
