import logo from './logo.svg';
import './App.css';
import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Hello from './Hello';
import Home from './Home';


function App() {


  return (
    <>
    <Routes>
    <Route path='/' element={<Hello/>}/>
    <Route path="/Home" element={<Home/>}/>

  </Routes>
    </>
  );
}

export default App;
