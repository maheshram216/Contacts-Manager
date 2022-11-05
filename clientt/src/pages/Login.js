import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import './Login.css';
import './Home.css';
import React from "react";
import AuthContext from "../context/AuthContext";
import dots from "../photos/dots.svg";
import topleft from "../photos/topleft.svg";
import bottomright from "../photos/bottomright.svg";

const Login = () => {

  const { loginUser } = useContext(AuthContext);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
      
    if (!credentials.email || !credentials.password) {
      alert(("Please enter all the required fields!"));
      return
      ;

    }
    // console.log(localStorage)
    loginUser(credentials);
  };

  
  return (
    <>
     <div className="outer-container">

    <img src={topleft} alt="topleft" className="topleft" />

    <div className="inner-container">

      <div className="left">
        <div className="leftsquare">
          <img src={dots} alt="dotLeft" className="dots" />
        </div>
      </div>

      <div className="inner-box">
     <div className="signin-logo-container">
        <p>Logo</p>
      </div>
      <div className="signin-message-container">
        <p>Enter your credentials to access your account</p>
      </div>
      <form action="" onSubmit={handleSubmit}>
        <div className='signin-idbox'>
          <input
            type="email"
            id="login_email"
            name="email"
            value={credentials.email}
            onChange={handleInputChange}
            placeholder="User ID"
            required
          />
        </div>
        <div className='signin-idbox'>
          <input
            type="password"
            id="login_password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            placeholder="Password"
            required
          />
        </div>
        <div>
          <button id='signin-button' type="submit">Sign In</button>
        </div>
        <div className='signupbox'>
          <Link to="/signup">Sign Up</Link>
        </div>
      </form>
      </div>

        <div className="right-container">
          <div className="rightsquare">
            <img src={dots} alt="dotright" className="dots" />
          </div>
        </div>
        
      </div> 

      <img src={bottomright} alt="bottomright" className="bottomright" />     

    </div>
    </>
  );
};

export default Login;
