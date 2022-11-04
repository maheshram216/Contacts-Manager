import React from 'react';
import{ useNavigate } from 'react-router-dom';
import './Aside.css';
import logout from '../photos/logout.svg';
import dashboard from '../photos/dashboard.svg';
import totalContact from '../photos/totalContact.svg';
import {motion} from 'framer-motion';

const Aside = () => {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/', {replace: true});
        localStorage.clear();
    }


  return (
    <aside className="aside">
      <div className="aside__container-logo">
        <h2 className="logo">Logo</h2>
      </div>
      <div className="aside__container-options">
        <motion.img whileTap={{scale: 0.9}} src={dashboard} alt="dashboard" className="dashboard" />

        <div className="totalContact-container">
          <motion.img
            whileTap={{scale: 0.9}}
            src={totalContact}
            alt="totalContacts"
            className="totalContact-option"
          />
          <div className="vertical"></div>
        </div>
      </div>
      <hr className="aside-line" />
      <div className="logout-container" onClick={handleClick}>
        <img src={logout} alt="logout" />
        <span>Log out</span>
      </div>
    </aside>
  );
}

export default Aside;