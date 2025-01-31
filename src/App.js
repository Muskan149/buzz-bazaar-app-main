import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import NavBar from './components/NavBar';
import Index from './components/Index';
import Buy from './components/Buy';
import Buy1 from './components/Buy1';

import Sell from './components/Sell';
import Sell1 from './components/Sell1';
import Sell2 from './components/Sell2';

import ImageUpload from './components/ImageUpload.js';


import UserProfile from './components/UserProfile';
import Login from './components/Login';
import Register from './components/Register';
import { SessionContext } from './components/AuthProvider';

// New component to handle conditional navigation
// const ConditionalRoute = ({ element, session }) => {
//   if (session) {
//     return element;
//   } else {
//     return <Navigate to="/login" />;
//   }
// };

const App = () => {
  const session = useContext(SessionContext);
  // const prevPage = window.location.pathname
  // console.log("Current page is " + prevPage)
  console.log("Session " + session)
  return (
    <>
      <NavBar session={session}/>
      <main>
      <Routes>
        <Route path="/" default element={<Index />} />
        <Route path="/index" element={<Index />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/image" element={<ImageUpload />} /> 
        <Route path="/sell" element={session ? <Sell2 /> : <Login/>} />  
        {/* todo: why is navigate to not working here */}
        <Route path="/userProfile" element={session ? <UserProfile /> : <Navigate to = "/"/> } />
      </Routes>
      </main>
    </>
  );
};

export default App;
