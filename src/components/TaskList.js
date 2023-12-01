import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton } from '@mui/material';
import { Link ,useNavigate} from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './TaskList.css';

function TaskList() {
  const [userTasks, setUserTasks] = useState([]);
  const navigate = useNavigate();

  const handleAddTask = () => {
    // Navigate to the add task page
    navigate('/add-task');
  };

  const handleDelete = async (taskId) => {
    try {
      const access_token = localStorage.getItem('accessToken');
      // Make a DELETE request to your API endpoint
      await axios.delete(`http://localhost:8000/test/delete-task/${taskId}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      // Fetch the updated user tasks after successful deletion
      const taskResponse = await axios.get('http://localhost:8000/test/user-task/', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      // Update the state to trigger a re-render
      setUserTasks(taskResponse.data);
    } catch (error) {
      console.error(`Error deleting task with ID ${taskId}:`, error);
    }
  };
  const handleInvite = (taskId) => {
    // Navigate to the invite page with the task ID
    navigate(`/invite/${taskId}`);
  };

  useEffect(() => {
    const fetchUserTasks = async () => {
      try {
        const access_token = localStorage.getItem('accessToken');
        const taskResponse = await axios.get('http://localhost:8000/test/user-task/', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        setUserTasks(taskResponse.data); // Assuming the API response is an array of tasks
      } catch (error) {
        console.error('Error fetching user tasks:', error);
      }
    };

    fetchUserTasks();
  }, []); // Run this effect only once on component mount

  return (
    <div className="task-list-container">
      <div className="card">
        <h2>User Tasks</h2>
        <TableContainer component={Paper} className="table-container">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Actions</TableCell>
                <TableCell>Invite Others</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>
                    <IconButton component={Link} to={`/task/${task.id}`}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(task.id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" color="secondary" onClick={() => handleInvite(task.id)}>
                      Invite
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="add-task-button-container">
          <Button variant="contained" color="primary" onClick={handleAddTask}>
            Add Task
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TaskList;