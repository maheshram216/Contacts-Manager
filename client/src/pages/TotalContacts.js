import React from 'react'
import Aside from '../components/Aside';
import "../components/Aside.css";

import Header from '../components/Header';
import Contacts from '../components/Contacts';
import { useState } from 'react';


const TotalContacts = () => {

  const [searchTerm, setSearchTerm] = useState("");

    return (
      <>
        <div className="totalcontact-container">
          <Aside />
          <div className="totalcontact-content">
            <Header setSearchTerm={setSearchTerm} />
            <hr />
            <Contacts searchTerm={searchTerm} />
          </div>
        </div>
      </>
    );
}

export default TotalContacts;
