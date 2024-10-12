import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import LoginPage from './pages/login';
import LoadingRunway from './pages/loading';
import Home from './pages/home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<LoginPage/>}/>
          <Route path="/runway" element={<LoadingRunway/>}/>
          <Route path="/home" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
