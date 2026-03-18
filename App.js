import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import Donate from './Donate';
import NGODashboard from './NGODashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/ngo-dashboard" element={<NGODashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
