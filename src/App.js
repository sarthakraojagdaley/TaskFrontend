// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/login.js';
import TaskList from './components/TaskList.js';
import EditTask from './components/Edit.js';
import AddTask from './components/AddTask.js';
import InvitePage from './components/Invite.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/task/:taskId" element={<EditTask />} />
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/invite/:taskId" element={<InvitePage />} /> {/* New route for the invite page */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
