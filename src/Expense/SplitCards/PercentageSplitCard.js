import { Grid, Card, CardContent, Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import UserDataCard from "../../UserDataCard";
import CustomSplitInput from "./CustomSplitInput";

const PercentageSplitCard = ({ splitList, setSplitList, totalAmount }) => {
  const [userPercentages, setUserPercentages] = useState([]);
  const [totalPercentage, setTotalPercentage] = useState(0);
  useEffect(() => {
    let tempUserPercentageList = [...userPercentages];

    splitList.forEach((user) => {
      const userExists = userPercentages.some(
        (existingUser) => existingUser.userId === user.userId
      );

      if (!userExists) {
        const tempPercentageObj = {
          userId: user.userId,
          percentage: 0,
        };
        tempUserPercentageList = [...tempUserPercentageList, tempPercentageObj];
      }
    });

    setUserPercentages(tempUserPercentageList);
  }, [splitList.length]);

  useEffect(() => {
    if (userPercentages.length > 0) {
      calculatePercentageSplit();
    }
  }, [userPercentages, totalAmount]);

  useEffect(()=>{
    const totalPercentage = userPercentages.reduce((sum,percentageObj)=>{
      return sum + percentageObj.percentage;
    },0);
    setTotalPercentage(totalPercentage);
  },[splitList]);

  const handleInputChange = (event, userId) => {
    const percentageValue = Math.max(
      0,
      Math.min(100, Number(event.target.value))
    );
    const newPercentages = userPercentages.map((userPercentage) =>
      userPercentage.userId === userId
        ? { ...userPercentage, percentage: percentageValue }
        : userPercentage
    );
    setUserPercentages(newPercentages);
    event.target.value = percentageValue;
  };

  const calculatePercentageSplit = () => {
    const updatedSplitList = splitList.map((user) => {
      const userPercentage = userPercentages.find(
        (percentageObj) => percentageObj.userId === user.userId
      );
      return {
        ...user,
        splitAmount: (totalAmount * userPercentage.percentage) / 100,
      };
    });

    setSplitList(updatedSplitList);
  };

  const handleUserCardDelete = (deleteUserID) => {
    setSplitList(splitList.filter((user) => user.userId !== deleteUserID));
    setUserPercentages(
      userPercentages.filter(
        (userPercentage) => userPercentage.userId !== deleteUserID
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
            Total Percentage: {totalPercentage}%
          </Typography>
          {totalPercentage < 100 ? (
            <Typography sx={{ color: "red", fontWeight: "bold" }}>
              Under by : {100 - totalPercentage}%
            </Typography>
          ) : (
            totalPercentage > 100 ?
            (<Typography sx={{ color: "red", fontWeight: "bold" }}>
              Over by : {totalPercentage - 100}%
            </Typography>)
            :null
          )}
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
              splitTypeText={"%"}
              userId={user.userId}
              handleInputChange={handleInputChange}
            />
          </Grid>
        ))}
    </>
  );
};

export default PercentageSplitCard;
