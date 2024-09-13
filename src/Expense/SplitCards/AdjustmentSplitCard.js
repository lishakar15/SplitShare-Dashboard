import { Grid,Box,Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import UserDataCard from "../../UserDataCard";
import CustomSplitInput from "./CustomSplitInput";

const AdjustmentSplitCard = ({ splitList, setSplitList, totalAmount }) => {
  const [userAdjustments, setUserAdjustments] = useState([]);
  const [totalAdjustment,setTotalAdjustment] = useState(0);

  useEffect(() => {
    let tempUserAdjustmentList = [...userAdjustments];

    splitList.forEach((user) => {
      const userExists = userAdjustments.some(
        (existingUser) => existingUser.userId === user.userId
      );

      if (!userExists) {
        const tempAdjustmentObj = {
          userId: user.userId,
          adjustmentAmount: 0,
        };
        tempUserAdjustmentList = [...tempUserAdjustmentList, tempAdjustmentObj];
      }
    });

    setUserAdjustments(tempUserAdjustmentList);
  }, [splitList.length]);

  useEffect(() => {
    if (userAdjustments.length > 0) {
      calculateAdjustments();
    }
  }, [userAdjustments, totalAmount]);

  const handleInputChange = (event, userId) => {
    const adjustmentVal = Number(event.target.value)
    const newAdjustments = userAdjustments.map((userAdjustment) =>
      userAdjustment.userId === userId
        ? { ...userAdjustment, adjustmentAmount: adjustmentVal }
        : userAdjustment
    );
    setUserAdjustments(newAdjustments);
    event.target.value = adjustmentVal;
  };
  useEffect(()=>{
    const totalAdj = userAdjustments.reduce((sum,userAdjustment)=>{
      return sum + userAdjustment.adjustmentAmount;
    },0);
    console.log("sum = "+totalAdj);
    setTotalAdjustment(totalAdj)
  },[splitList]);

  const calculateAdjustments = () => {
    let totalAdjustments = userAdjustments.reduce(
      (total, userAdjustment) =>
        total + Number(userAdjustment.adjustmentAmount),
      0
    );
    const equalSharePerUser = splitList
      ? (totalAmount - totalAdjustments) / splitList.length
      : 0;
    const updatedSplitList = splitList.map((user) => {
      const userAdjustmentObj = userAdjustments.find(
        (userAdjustment) => user.userId === userAdjustment.userId
      );
      return {
        ...user,
        splitAmount: equalSharePerUser + userAdjustmentObj.adjustmentAmount,
      };
    });

    setSplitList(updatedSplitList);
  };


  const handleUserCardDelete = (deleteUserID) => {
    setSplitList(splitList.filter((user) => user.userId !== deleteUserID));
    setUserAdjustments(
      userAdjustments.filter(
        (userAdjustment) => userAdjustment.userId !== deleteUserID
      )
    );
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
          <Typography>
            Specify the percentages that's fair for your situation.
          </Typography>
          <Typography sx={{ fontWeight: "bold" }}>
          Total Adjustments: ₹{totalAdjustment !== null && totalAdjustment !== undefined ? totalAdjustment.toFixed(2) : 0}
          </Typography>
            {totalAdjustment > totalAmount ?
            (<Typography sx={{ color: "red", fontWeight: "bold" }}>
              Over by : ₹{(totalAdjustment - totalAmount).toFixed(2)}
            </Typography>)
            :null
          }
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
            <CustomSplitInput
              splitTypeText={"+"}
              userId={user.userId}
              handleInputChange={handleInputChange}
            />
          </Grid>
        ))}
    </>
  );
};

export default AdjustmentSplitCard;
