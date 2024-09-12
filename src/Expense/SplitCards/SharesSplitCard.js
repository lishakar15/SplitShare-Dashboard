import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import UserDataCard from "../../UserDataCard";
import CustomSplitInput from "./CustomSplitInput";

const SharesSplitCard = ({
  splitList,
  setSplitList,
  totalAmount,
}) => {
  const [userShares, setUserShares] = useState([]);

  useEffect(() => {
    let tempUserShareList = [...userShares];

    splitList.forEach((user) => {
      const userExists = userShares.some(
        (existingUser) => existingUser.userId === user.userId
      );

      if (!userExists) {
        const tempShareObj = {
          userId: user.userId,
          shares: 0,
        };
        tempUserShareList = [...tempUserShareList, tempShareObj];
      }
    });

    setUserShares(tempUserShareList);
  }, [splitList.length]);

  useEffect(() => {
    if (userShares.length > 0) {
      calculateSplitShares();
    }
  }, [userShares,totalAmount]);

  const handleInputChange = (event, userId) => {
    const newShares = userShares.map((userShare) =>
      userShare.userId === userId
        ? { ...userShare, shares: Number(event.target.value) }
        : userShare
    );
    setUserShares(newShares);
  };

  const calculateSplitShares = () => {
    let totalShares = userShares.reduce(
      (total, userShare) => total + Number(userShare.shares),
      0
    );

    const costOfSingleShare = totalShares ? totalAmount / totalShares : 0;

    const updatedSplitList = splitList.map((user) => {
      const userShare = userShares.find(
        (share) => share.userId === user.userId
      );
      return { ...user, splitAmount: userShare ? userShare.shares * costOfSingleShare : 0 };
    });

    setSplitList(updatedSplitList);
  };

  const handleUserCardDelete = (deleteUserID)=>{
    setSplitList(splitList.filter((user)=>user.userId !== deleteUserID));
    setUserShares(userShares.filter((userShare)=>userShare.userId !== deleteUserID));
}

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
              splitTypeText={"Shares"}
              userId={user.userId}
              handleInputChange={handleInputChange}
            />
          </Grid>
        ))}
    </>
  );
};

export default SharesSplitCard;