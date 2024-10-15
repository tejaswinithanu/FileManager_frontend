import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import LoginPage from './pages/login';
import LoadingRunway from './pages/loading';
import Home from './pages/home';
import { Folders } from './components/folders';
import { UserManagement } from './components/userManagement';
import { Files } from './components/files';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/runway" element={<LoadingRunway/>}/>
          <Route path="/" element={<Home/>}>
            <Route index element={<Folders/>}/>
            <Route path="/folders" element={<Folders/>}/>
            <Route path="/files" element={<Files/>}/>
            <Route path="/user-management" element={<UserManagement/>}/>
          </Route>
              
      </Routes>
    </BrowserRouter>
  );
}

export default App;
