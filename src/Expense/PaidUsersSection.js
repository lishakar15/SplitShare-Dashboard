import React, { useState } from "react";
import {
  Grid,
  Typography,
  Box,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import SinglePaidUser from "./SinglePaidUser";
import MultiPaidUser from "./MultiPaidUser";

const PaidUsersSection = ({ totalAmount, payer  }) => {

  const handleChangePayer = (changedUser) => {
    setPaidUsers(changedUser ? [changedUser] : []);
    setIsMultiPayer(false);
  };

const handleAddPayersButtonClick =()=>{
  setIsMultiPayer(true);
}


  const [paidUsers, setPaidUsers] = useState([payer]);
  const [isMultiPayer, setIsMultiPayer] = useState(false);

  return (
    <>
    {!isMultiPayer ? 
     <SinglePaidUser paidUsers={paidUsers} handleChangePayer={handleChangePayer} handleAddPayersButtonClick={handleAddPayersButtonClick}  defaultPayer={payer}/>
        :
        <MultiPaidUser paidUsers={paidUsers} handleChangePayer={handleChangePayer} setPaidUsers={setPaidUsers} defaultPayer={payer}/>
    }

       
    </>
      
  );
};

export default PaidUsersSection;
