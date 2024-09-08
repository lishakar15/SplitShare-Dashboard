import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import UserDataCard from "../../UserDataCard";

const EqualSplitCard = ({ splitList, setSplitList, totalAmount, handleUserCardDelete }) => {
  const calculateEqualSplits = () => {
    const averageAmount = totalAmount > 0 && splitList && splitList.length > 0
      ? totalAmount / splitList.length
      : 0;
    setSplitList(
      splitList.map((user) => ({ ...user, splitAmount: averageAmount }))
    );
  };

  useEffect(() => {
    calculateEqualSplits();
  }, [totalAmount, splitList.length]);

  return (
    <>
      {splitList && splitList.map((user) => (
        <Grid item xs={12} md={6} key={user.userId}>
          <UserDataCard
            userId={user.userId}
            userName={user.userName}
            amount={user.splitAmount}
            handleUserCardDelete={handleUserCardDelete}
          />
        </Grid>
      ))}
    </>
  );
};

export default EqualSplitCard;