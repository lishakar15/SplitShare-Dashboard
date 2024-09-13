import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import UserDataCard from "../../UserDataCard";
import CustomSplitInput from "./CustomSplitInput";

const ManualSplitCard = ({ splitList, setSplitList, totalAmount }) => {
  useEffect(() => {
    setSplitList(
      splitList.map((user) => {
        return { ...user, splitAmount: 0 };
      })
    );
  }, []);

  const handleInputChange = (event, userId) => {
    const amountVal = Number(event.target.value);
    const updatedSplitList = splitList.map((user) => {
      if (user.userId === userId) {
        return { ...user, splitAmount: amountVal ? amountVal : 0 };
      }
      else return user;
    });
    setSplitList(updatedSplitList);
    event.target.value=amountVal;
  };

  const handleUserCardDelete = (deleteUserID) => {
    setSplitList(splitList.filter((user) => user.userId !== deleteUserID));
  };
  return (
    <>
      {splitList &&
        splitList.map((user) => (
          <Grid item xs={12} md={6} key={user.userId}>
            <UserDataCard
              userId={user.userId}
              userName={user.userName}
              amount={user.splitAmount}
              handleUserCardDelete={handleUserCardDelete}
            />
            <CustomSplitInput
              splitTypeText={"Amount"}
              userId={user.userId}
              handleInputChange={handleInputChange}
            />
          </Grid>
        ))}
    </>
  );
};

export default ManualSplitCard;
