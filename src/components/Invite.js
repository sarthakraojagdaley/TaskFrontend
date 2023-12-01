import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, FormControl } from '@mui/material';
import axios from 'axios';

const centerCardStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};

const cardStyle = {
  padding: '20px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
};

function InvitePage() {
  const { taskId } = useParams();
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('http://localhost:8000/test/invite-users/', {
            task_id: taskId,
            email,
          });
          

      console.log('Invite API response:', response.data);

      // Handle success or update the UI accordingly

      navigate('/tasks');
    } catch (error) {
      console.error('Error inviting user:', error);
      // Handle error or update the UI accordingly
    }
  };

  return (
    <div style={centerCardStyle}>
      <div style={cardStyle}>
        <h2>Invite Page</h2>
        <p>Task ID: {taskId}</p>
        <form onSubmit={handleFormSubmit}>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormControl>
          <br />
          <Button type="submit" variant="contained" color="primary">
            Invite
          </Button>
        </form>
      </div>
    </div>
  );
}

export default InvitePage;
