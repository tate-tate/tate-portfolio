import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import CurrentWorks from './pages/CurrentWorks';
import Personal from './pages/Personal';
import OtherProjects from './pages/OtherProjects';

function App() {
  const [count, setCount] = useState(0);

  return (
    <HashRouter>
      <header>
        <Navbar />
      </header>
      <main className="main-content">
        <title>Tate Sever - Data Visualization</title>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/current-works" element={<CurrentWorks />} />
          <Route path="/other-projects" element={<OtherProjects />} />
          <Route path="/personal" element={<Personal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </HashRouter>
  );
}

export default App;