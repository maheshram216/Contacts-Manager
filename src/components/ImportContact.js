import React from 'react'

import { FileUploader } from "react-drag-drop-files";


const fileTypes = ["CSV"];

const ImportContact = ({uploadData, setIsAlert, setIsUpload}) => {


    
    const onDrop = async(file) => {

        const formData = new FormData();
        formData.append("file", file);

        const data = await fetch("http://localhost:8000/contact/contactpost", {
            method: "POST",
            headers: {
                authorization: `test ${localStorage.getItem("token")}`,
            },
            body: formData,
        });

        const response = await data.json();
        uploadData();
        if(response.status === "success"){
          setIsUpload(true);
          setTimeout(() => {
            setIsUpload(false);
          }, 3000);
        }
        setIsAlert(false);
        console.log(response);
    }

  return (
    <div className='import'>
      <FileUploader handleChange={onDrop} types={fileTypes} name="file" />
    </div>
  )
}

export default ImportContact;