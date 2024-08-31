import './App.css';
import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './Home';
import Activity from './Activity';
import Friends from './Friends';
import Groups from './Groups';
import Expense from './Expenses';


function App() {


  return (
    <>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path="/activities" element={<Activity/>}/>
    <Route path="/friends" element={<Friends/>}/>
    <Route path="/groups" element={<Groups/>} />
    <Route path="/expenses" element={<Expense/>} />
  </Routes>
    </>
  );
}

export default App;
