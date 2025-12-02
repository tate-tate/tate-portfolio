import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import CurrentWorks from './pages/CurrentWorks';
import Photography from './pages/Photography';
import OtherProjects from './pages/OtherProjects';
import D3Vis from './pages/d3Vis';
import Quicklinks from './pages/quicklinks';
import UXstudio from './pages/UXstudio';

function App() {
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
          <Route path="/photography" element={<Photography />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/d3-vis" element={<D3Vis />} />
          <Route path="/quicklinks" element={<Quicklinks />} />
          <Route path="/ux-studio" element={<UXstudio />} />
          </Routes>
      </main>
    </HashRouter>
  );
}

export default App;