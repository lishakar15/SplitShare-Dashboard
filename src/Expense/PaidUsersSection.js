import React, { useState } from "react";
import SinglePaidUser from "./SinglePaidUser";
import MultiPaidUser from "./MultiPaidUser";

const PaidUsersSection = ({ totalAmount }) => {
  const [isMultiPayer, setIsMultiPayer] = useState(false);

  return (
    <>
    {!isMultiPayer ? 
     <SinglePaidUser setIsMultiPayer={setIsMultiPayer}/>
        :
      <MultiPaidUser setIsMultiPayer={setIsMultiPayer}/>
    }
    </>
  );
};

export default PaidUsersSection;
