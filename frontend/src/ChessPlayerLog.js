import React from 'react';
import {BrowserRouter,Route,Routes,Navigate} from 'react-router-dom';
import PlayerSideBar from './components/PlayerSideBar'
import './App.css';
import Games from './components/Games.js'
import Pairing from './components/Pairing.js'
import About from './components/About.js'
import Header from './components/Header'
import PlayerDashboard from './components/PlayerDashboard';
import Footer from './components/Footer';

const ChessPlayerLog = () => {
  return (
    <div>
      <Header/>
      <BrowserRouter>
        <PlayerSideBar>
          <Routes>
            <Route path="/" element={<Navigate to="/PlayerDashboard" />} />
            <Route path="/PlayerDashBoard"element={<PlayerDashboard/>}/>
            <Route path="/Games"element={<Games/>}/>
            {/*<Route path="/Pairing"element={<Pairing/>}/>*/}
            <Route path="/About"element={<About/>}/>
          </Routes>
        </PlayerSideBar>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default ChessPlayerLog;