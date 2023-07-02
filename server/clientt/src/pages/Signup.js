import { useContext, useState } from "react";
// import { Link } from "react-router-dom";
import './Signup.css';
import React from "react";
import './Home.css';
import AuthContext from "../context/AuthContext";
import dots from "../photos/dots.svg";
import topleft from "../photos/topleft.svg";
import bottomright from "../photos/bottomright.svg";

const Signup = () => {

  const { signupUser } = useContext(AuthContext);

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(credentials)

    if (
      !credentials.email ||
      !credentials.password ||
      !credentials.confirmPassword
    ) {
      alert(("Please enter all the required fields!"));
      return;
    }

    if (credentials.password !== credentials.confirmPassword) {
      alert(("Password does not match!"));
      return;
    }
    if (credentials.password.length < 8) {
      alert("Password should be at least 8 characters long");
      return;
    }

    const userData = { ...credentials, confirmPassword: undefined };
    signupUser(userData);
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
            <div className="signup-logo-container">
              <p>Logo</p>
            </div>
            <div className="signup-message-container">
              <p>Create New Account</p>
            </div>
            <form action="" onSubmit={handleSubmit}>
              <div className='signup-idbox'>
                <input
                  type="email"
                  id="signup_email"
                  name="email"
                  value={credentials.email}
                  onChange={handleInputChange}
                  placeholder="Mail ID"
                  required
                />
              </div>
              <div className='signup-idbox'>
                <input
                  type="password"
                  id="signup_password"
                  name="password"
                  value={credentials.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  required
                />
              </div>
              <div className='signup-idbox'>
                <input
                  type="password"
                  id="confirm-password"
                  name="confirmPassword"
                  value={credentials.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm Password"
                  required
                />
              </div>
              <div>
                <button id='signup-button' type="submit">Sign Up</button>
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

export default Signup;
