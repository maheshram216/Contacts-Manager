import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TotalContacts from "./pages/TotalContacts";
import { AuthContextProvider } from "./context/AuthContext";


function App() {
  return (
    <div>
      <AuthContextProvider>
        <Routes>
            <Route index path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} /> 
            <Route path='/contacts' element={<TotalContacts/>} />
     
        </Routes>
      </AuthContextProvider>
      
     


    </div>
  );
}

export default App;
