import React from 'react';
import {BrowserRouter,Route,Routes,Navigate} from 'react-router-dom';
import Sidebar from './components/Sidebar.js';
import './App.css';
import Club from './components/Club.js'
import Pairing from './components/Pairing.js'
import About from './components/About.js'
import Header from './components/Header'
import CoachDashboard from './components/CoachDashboard.js';
import Footer from './components/Footer.js';

const CoachLog = () => {
  return (
    <div>
      <Header/>
      <BrowserRouter>
        <Sidebar>
          <Routes>
            <Route path="/" element={<Navigate to="/Dashboard" />} />
            <Route path="/DashBoard"element={<CoachDashboard/>}/>
            <Route path="/Club"element={<Club/>}/>
            <Route path="/Pairing"element={<Pairing/>}/>
            <Route path="/About"element={<About/>}/>
          </Routes>
        </Sidebar>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default CoachLog;
