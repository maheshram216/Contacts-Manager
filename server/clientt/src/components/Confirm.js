import React from "react";
import confirmDelete from "../photos/confirmDelete.svg";
import { motion } from "framer-motion";

const Confirm = ({ setIsConfirm, handleClick}) => {
 
  return (
    <div className="import">
      <img src={confirmDelete} alt="Confirm" />
      <div className="popdiv">
        <motion.button
          className="cancel"
          onClick={() => {
            setIsConfirm(false);
          }}
        >
          Cancel
        </motion.button>
        <motion.button className="ok" onClick={handleClick}>
          Ok
        </motion.button>
      </div>
    </div>
  );
};

export default Confirm;
