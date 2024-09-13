import { Grid, Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import UserDataCard from "../../UserDataCard";

const EqualSplitCard = ({ splitList, setSplitList, totalAmount }) => {
  const calculateEqualSplits = () => {
    const averageAmount =
      totalAmount > 0 && splitList && splitList.length > 0
        ? totalAmount / splitList.length
        : 0;
    setSplitList(
      splitList.map((user) => ({ ...user, splitAmount: averageAmount }))
    );
  };

  useEffect(() => {
    calculateEqualSplits();
  }, [totalAmount, splitList.length]);

  const handleUserCardDelete = (deleteUserID) => {
    setSplitList(splitList.filter((user) => user.userId !== deleteUserID));
  };
  return (
    <>
      <Grid item xs={12}>
        <Box
          sx={{
            textAlign: "center",
            backgroundColor: "f9fafb",
            border: "1px solid lightgray",
            borderRadius: "11px",
            py: 1,
          }}
        >
          <Typography>Select which people owe an equal share.</Typography>
        </Box>
      </Grid>
      {splitList &&
        splitList.map((user) => (
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
