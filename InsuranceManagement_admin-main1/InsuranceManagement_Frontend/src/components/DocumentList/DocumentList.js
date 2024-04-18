import './DocumentList.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { baseURL } from '../../Server';
import {
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';

export function AddDocument({ onAdd }) {
  const token = localStorage.getItem("login");
  const [newDocumentType, setNewDocumentType] = useState("");
  const [policyList, setPolicyList] = useState([]);
  const [selectedPolicyId, setSelectedPolicyId] = useState("");

  const handleAdd = () => {
    if (newDocumentType === "" || selectedPolicyId === "") {
      alert("Please enter both Document Type and select a Policy.");
      return;
    }
    onAdd({
      DocumentType: newDocumentType,
      PolicyId: parseInt(selectedPolicyId)


    });
    setNewDocumentType("");
    setSelectedPolicyId("");
  };

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const response = await axios.get(baseURL + '/policy', {
          headers: { Authorization: `Bearer ${token}`, credentials: true }
        });
        console.log(response.data);
        setPolicyList(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPolicy();
  }, []);

  return (
    <Card variant="outlined" sx={{ marginBottom: 2 }}>
      <CardContent>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel id="policy-select-label">Select Policy</InputLabel>
          <Select
            labelId="policy-select-label"
            id="policy-select"
            value={selectedPolicyId}
            onChange={(e) => setSelectedPolicyId(e.target.value)}
          >
            <MenuItem value="">
              <em>Select Policy</em>
            </MenuItem>
            {policyList.map(item => (
              <MenuItem key={item.id} value={item.id}>{item.policyName}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          id="document-type"
          label="Document Type"
          value={newDocumentType}
          onChange={(e) => setNewDocumentType(e.target.value)}
          variant="outlined"
          sx={{ marginBottom: 2 }}
        />

        <Button variant="contained" onClick={handleAdd}>Add Document</Button>
      </CardContent>
    </Card>
  );
};

export default function DocumentList() {
  const [docList, setDocList] = useState([]);
  const [docListError, setDocListError] = useState('');
  const token = localStorage.getItem("login");
  useEffect(() => {
    const fetchDocumentList = async () => {
      try {
        const response = await axios.get(baseURL + '/policy/policy-documents', {
          headers: { Authorization: `Bearer ${token}`, credentials: true }
        });
        console.log(response.data);
        setDocList(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDocumentList();

  }, []);

  const handleAddDocument = ({ DocumentType, PolicyId }) => {
    const newDocumentItem = {
      documentType: DocumentType,
      policyId: PolicyId
    };

    const addDocument = async (newDocumentItem) => {
      try {
        const response = await axios.post(baseURL + '/policy/add-document', newDocumentItem);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    addDocument(newDocumentItem);
    setDocList([...docList, newDocumentItem]);
  };

  return (
    <>
      <AddDocument onAdd={handleAddDocument} />
      <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
        {docList.map(item => (
          <Card key={item.id} variant="outlined" sx={{ marginBottom: 2 }}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>{item.documentType}</Typography>
            </CardContent>
          </Card>
        ))}
      </Paper>
    </>
  );
}
