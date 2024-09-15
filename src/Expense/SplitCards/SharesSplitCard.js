import { Grid, Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import UserDataCard from "../../UserDataCard";
import CustomSplitInput from "./CustomSplitInput";

const SharesSplitCard = ({ splitList, setSplitList, totalAmount }) => {
  const [userShares, setUserShares] = useState([]);
  const [totalUserShares, setTotalUserShares] = useState(0);

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
  }, [userShares, totalAmount]);

  useEffect(() => {
    const totalShares = userShares.reduce((sum, user) => {
      return sum + user.shares;
    }, 0);
    setTotalUserShares(totalShares);
  }, [splitList]);

  const handleInputChange = (event, userId) => {
    const shareVal = Number(event.target.value);
    const newShares = userShares.map((userShare) =>
      userShare.userId === userId
        ? { ...userShare, shares: shareVal }
        : userShare
    );
    setUserShares(newShares);
    event.target.value = shareVal;
  };

  const calculateSplitShares = () => {
    const totalShares = userShares.reduce(
      (total, userShare) => total + Number(userShare.shares),
      0
    );

    const costOfSingleShare = totalShares ? totalAmount / totalShares : 0;

    const updatedSplitList = splitList.map((user) => {
      const userShare = userShares.find(
        (share) => share.userId === user.userId
      );
      return {
        ...user,
        shareAmount: userShare ? userShare.shares * costOfSingleShare : 0,
      };
    });

    setSplitList(updatedSplitList);
  };

  const handleUserCardDelete = (deleteUserID) => {
    setSplitList(splitList.filter((user) => user.userId !== deleteUserID));
    setUserShares(
      userShares.filter((userShare) => userShare.userId !== deleteUserID)
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
            Specify time-based splitting or family-size splitting.
          </Typography>
          <Typography sx={{ fontWeight: "bold" }}>
            Total Shares: {totalUserShares}
          </Typography>
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
