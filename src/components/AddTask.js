// AddTask.js
import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';
import {useNavigate} from 'react-router-dom';
import './AddTask.css';

function AddTask() {
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const navigate = useNavigate()

  useEffect(() => {
    // Establish WebSocket connection
    const socket = new WebSocket('ws://127.0.0.1:8000/ws/websock/');

    // Handle incoming messages
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // Handle the incoming real-time update
      console.log('Real-time update:', data);

      // You can use the real-time data to update your UI or take other actions
    };

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      socket.close();
    };
  }, []);

  const handleInputChange = (event) => {
    setNewTask({
      ...newTask,
      [event.target.name]: event.target.value,
    });
  };

  const handleAdd = async () => {
    try {
      const access_token = localStorage.getItem('accessToken');
      await axios.post(
        'http://localhost:8000/test/add-task/',
        {
          title: newTask.title,
          description: newTask.description,
          due_date:newTask.due_date,
          status:newTask.status
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      // After adding the task, navigate back to the task list page
      navigate('/tasks');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div className="task-form-container">
      <div className="card">
        <h2>Add Task</h2>
        <form>
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            name="title"
            value={newTask.title}
            onChange={handleInputChange}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            margin="normal"
            name="description"
            value={newTask.description}
            onChange={handleInputChange}
          />
          <TextField
            label="Due Date"
            fullWidth
            type="date" // Use type="date" for a date input
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            name="due_date"
            value={newTask.due_date}
            onChange={handleInputChange}
          />
          <TextField
            label="Status"
            fullWidth
            margin="normal"
            name="status"
            value={newTask.status}
            onChange={handleInputChange}
          />
          <Button variant="contained" color="primary" onClick={handleAdd}>
            Save
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AddTask;
