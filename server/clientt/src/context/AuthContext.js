import  React, { createContext, useState } from "react";

import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);


  //login req
  const loginUser = async (userData) => {
    try {
      const res = await fetch(`http://localhost:8000/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userData }),
      });

      const result = await res.json();
      if (!result.error) {
        console.log(result);
        localStorage.setItem("token", result.token);
        setUser(result.userData);
        navigate("/contacts");
      } 
      if(result.meassage === 'Invalid credentials' ){
        setError(true)
        alert("invalid password");
        navigate("/");
      }
      if(result.message === 'Invalid user' ){
        setError(true)
        alert(" user not exist please signup");
        navigate("/");
      }
      if(result.msg === 'Invalid user' ){
        setError(true)
        alert(" user not exist please signup");
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      
    }
  };

  //signup req
  const signupUser = async (userData) => {
    try {
      const res = await fetch(`http://localhost:8000/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userData }),
      });

      const result = await res.json();
      if (!result.error) {
        console.log(result);
        navigate("/", { replace: true });
      } 
      if(result.message === "user exist" ){
        setError(true)
        alert("user exist");
        navigate('/signup')
      }
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <AuthContext.Provider value={{ loginUser, signupUser, user,error }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;