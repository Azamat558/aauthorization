import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom'
import Register from './pages/Register';
import Auth from './pages/Auth';
import Table from './pages/Table';


const Private = ({ component }) => {
  const isLogged = useSelector(state => state.user.isLogged)
  return isLogged ? component : <Navigate to={'/auth'} />
}

const App = () => {

  return (
    <Routes>
      <Route path={'/'} element={<Private component={<Auth />} />} />
      <Route path={'/auth'} element={<Auth />}  />
      <Route path={'/register'} element={<Register />} />
      <Route path={'/table'} element={<Table />} />
    </Routes>

  );
};

export default App;
