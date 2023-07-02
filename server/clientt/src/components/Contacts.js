import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import Contact from "./Contact";
import { motion } from "framer-motion";
import selectDate from "../photos/selectDate.svg";
import deleteButton from "../photos/deleteButton.svg";
import importButton from "../photos/importButton.svg";
import exportButton from "../photos/exportButton.svg";
import { useState, useRef } from "react";
import Delete from "./Delete";
import Confirm from "./Confirm";
import ImportContact from "./ImportContact";
import Upload from "./Upload";
import './contacts.css';

const Contacts = ({ searchTerm }) => {
  const navigate = useNavigate();
  const [isUpload, setIsUpload] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [confirm, setIsConfirm] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [contacts, setContacts] = useState([]);
  const ref = useRef();

  const [selectAllCheckboxChecked, setSelectAllCheckboxChecked] = useState(false);

  const selectAllCheckboxChanged = (e) => {
    setSelectAllCheckboxChecked(e.target.checked);
  };

  const uploadData = async () => {
    const dataFile = await fetch("http://localhost:8000/contact/mycontacts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `test ${localStorage.getItem("token")}`,
      },
    });
    const data = await dataFile.json();

    if (!`test ${localStorage.getItem("token")}`) {
      return navigate('/')
    };

    if (!data.error) {

      for (let contact of data.contacts)
        contact.checked = false;
      setContacts(data.contacts);
      console.log(data.contacts);
    }
  };
  useEffect(() => {
    uploadData();
  }, []);

  const handleDeleteAll = async () => {
    let contactsToDelete = [];
    for (let contact of contacts)
      if (contact.checked)
        contactsToDelete.push(contact);

    const data = await fetch("http://localhost:8000/contact/deleteall", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `test ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ contactsToDelete }),
    });

    await data.json();

    uploadData();
    setIsConfirm(false);
    setSelectAllCheckboxChecked(false);
  }


  return (
    <div className="table-conatainer">
      <div className="button-container">
        <div className="left">
          <motion.img src={selectDate} alt="selectdate and filter" />
        </div>
        <span className="right">
          <motion.img
            whileTap={{ scale: 0.85 }}
            src={deleteButton}
            alt="deleteButton"
            onClick={() => {
              setIsConfirm(!confirm);
              setIsAlert(false);
            }}
          />
          <motion.img
            whileTap={{ scale: 0.85 }}
            src={importButton}
            alt="importButton"
            onClick={() => {
              setIsAlert(!isAlert);
              setIsConfirm(false);
            }}
          />
          <motion.img
            whileTap={{ scale: 0.85 }}
            src={exportButton}
            alt="exportButton"
          />
        </span>
      </div>

      {isUpload ? <Upload /> : null}
      {isDelete ? <Delete /> : null}
      {confirm ? (
        <Confirm
          setIsConfirm={setIsConfirm}
          handleClick={() => handleDeleteAll()}
        />
      ) : null}
      {isAlert ? (
        <ImportContact
          uploadData={uploadData}
          setIsAlert={setIsAlert}
          setIsUpload={setIsUpload}
        />
      ) : null}

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th className="checkboxes">
                <input
                  className="checkbox"
                  type="checkbox"
                  ref={ref}
                  checked={selectAllCheckboxChecked}
                  onChange={e => {
                    selectAllCheckboxChanged(e);

                    if (e.target.checked === true) {
                      for (let contact of contacts) contact.checked = true;
                    } else {
                      for (let contact of contacts) contact.checked = false;
                    }
                    console.log(contacts);
                  }}
                />
              </th>
              <th className="name">Name</th>
              <th className="designation">Designation</th>
              <th className="company">Company</th>
              <th className="industry">Industry</th>
              <th className="email">Email</th>
              <th className="phoneNumber">Phone Number</th>
              <th className="country">Country</th>
              <th className="action">Action</th>
            </tr>
          </thead>
          <tbody>
            {contacts
              .filter((contact) => {
                if (searchTerm === "") {
                  return contact;
                } else if (
                  contact.email.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return contact;
                }
              })
              .map((contact) => {
                return (
                  <Contact
                    key={contact._id}
                    {...contact}
                    uploadData={uploadData}
                    setIsDelete={setIsDelete}
                    onCheckboxChanged={(checked) => {
                      contact.checked = checked;
                      setContacts([...contacts]);
                      if (!checked) setSelectAllCheckboxChecked(false);
                    }}

                  />
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Contacts;
