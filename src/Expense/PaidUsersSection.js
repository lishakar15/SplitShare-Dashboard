import React, { useState } from "react";
import SinglePaidUser from "./SinglePaidUser";
import MultiPaidUser from "./MultiPaidUser";

const PaidUsersSection = ({ totalAmount, defaultPayer  }) => {


  const handleChangePayer = (changedUser) => {
    setPaidUsers(changedUser ? [changedUser] : []);
    setIsMultiPayer(false);
  };

const handleAddPayersButtonClick =()=>{
  setIsMultiPayer(true);
}


  const [paidUsers, setPaidUsers] = useState([defaultPayer]);
  const [isMultiPayer, setIsMultiPayer] = useState(false);

  return (
    <>
    {!isMultiPayer ? 
     <SinglePaidUser paidUsers={paidUsers} handleChangePayer={handleChangePayer} handleAddPayersButtonClick={handleAddPayersButtonClick}  defaultPayer={defaultPayer}/>
        :
      <MultiPaidUser paidUsers={paidUsers} handleChangePayer={handleChangePayer} setPaidUsers={setPaidUsers} totalAmount={totalAmount} defaultPayer={defaultPayer}/>
    }

       
    </>
      
  );
};

export default PaidUsersSection;
