import { Grid, Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import UserDataCard from "../../UserDataCard";
import CustomSplitInput from "./CustomSplitInput";

const ManualSplitCard = ({ splitList, setSplitList, totalAmount }) => {
  const [totalSplitAmount, setTotalSplitAmount] = useState(0);
  useEffect(() => {
    setSplitList(
      splitList.map((user) => {
        return { ...user, shareAmount: 0 };
      })
    );
  }, []);

  const handleInputChange = (event, userId) => {
    const amountVal = Number(event.target.value);
    const updatedSplitList = splitList.map((user) => {
      if (user.userId === userId) {
        return { ...user, shareAmount: amountVal ? amountVal : 0 };
      } else return user;
    });
    setSplitList(updatedSplitList);
    event.target.value = amountVal;
  };
  useEffect(() => {
    const splitAmountSum = splitList.reduce((sum, user) => {
      return sum + user.shareAmount;
    }, 0);
    setTotalSplitAmount(splitAmountSum);
  }, [splitList]);

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
          <Typography>Specify exactly how much each person owes.</Typography>
          <Typography sx={{ fontWeight: "bold" }}>
            Total: ₹
            {totalSplitAmount !== null && totalSplitAmount !== undefined
              ? totalSplitAmount.toFixed(2)
              : 0}
          </Typography>
          {totalSplitAmount < totalAmount ? (
            <Typography sx={{ color: "red", fontWeight: "bold" }}>
              Under by : ₹{(totalAmount - totalSplitAmount).toFixed(2)}
            </Typography>
          ) : totalSplitAmount > totalAmount ? (
            <Typography sx={{ color: "red", fontWeight: "bold" }}>
              Over by : ₹{(totalSplitAmount - totalAmount).toFixed(2)}
            </Typography>
          ) : null}
        </Box>
      </Grid>
      {splitList &&
        splitList.map((user) => (
          <Grid item xs={12} md={6} key={user.userId}>
            <UserDataCard
              userId={user.userId}
              userName={user.userName}
              amount={user.shareAmount}
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
