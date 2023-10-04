import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Tasks from 'pages/tasks/tasks';
import Project from 'pages/projects/project';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/tasks/:id" element={<Tasks />} />
        <Route path="/project" element={<Project />} />
        <Route index element={<Project />} />
      </Routes>
    </div>
  );
}

export default App;
