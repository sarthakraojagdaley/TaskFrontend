// EditTask.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import './EditTask.css';

function EditTask() {
  const { taskId } = useParams();
  const [task, setTask] = useState({ title: '', description: '', status: 'TODO' });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const access_token = localStorage.getItem('accessToken');
        const taskResponse = await axios.get(`http://127.0.0.1:8000/test/tasks/${taskId}/`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        setTask((prevTask) => ({
          ...prevTask,
          title: taskResponse.data.title || '',
          description: taskResponse.data.description || '',
          status: taskResponse.data.status || 'TODO',
        }));
      } catch (error) {
        console.error('Error fetching task:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleEdit = async () => {
    try {
      const access_token = localStorage.getItem('accessToken');
      await axios.put(
        `http://127.0.0.1:8000/test/update-task/${taskId}`,
        {
          title: task.title,
          description: task.description,
          status: task.status,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      // Redirect to the task list page after editing
      navigate('/tasks');
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  const handleChange = (event) => {
    setTask({
      ...task,
      [event.target.name]: event.target.value,
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="edit-task-container">
      <div className="card">
        <h2>Edit Task</h2>
        <form>
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            name="title"
            value={task.title}
            onChange={handleChange}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            margin="normal"
            name="description"
            value={task.description}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={task.status}
              onChange={handleChange}
            >
              <MenuItem value="TODO">TODO</MenuItem>
              <MenuItem value="IN_PROGRESS">IN_PROGRESS</MenuItem>
              <MenuItem value="COMPLETED">COMPLETED</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleEdit}>
            Save
          </Button>
        </form>
      </div>
    </div>
  );
}

export default EditTask;
