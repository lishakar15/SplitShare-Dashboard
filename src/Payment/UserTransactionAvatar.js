import React from "react";
import { Box, Button, Typography } from "@mui/material";
import AvatarGenerator from "../AvatarGenerator";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

const UserTransactionAvatar = ({ settlement, setSettlement }) => {
  const handlePayerChange = () => {
    setSettlement((prevVal) => ({
      ...prevVal,
      paidBy: prevVal.paidTo,
      paidByUserName: prevVal.paidToUserName,
      paidTo: prevVal.paidBy,
      paidToUserName: prevVal.paidByUserName,
    }));
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          <AvatarGenerator userName={settlement.paidByUserName} size="md" />
          <Button onClick={() => handlePayerChange()}>
            <SwapHorizIcon fontSize="large"></SwapHorizIcon>
          </Button>
          <AvatarGenerator userName={settlement.paidToUserName} size="md" />
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h5" gutterBottom>
          {settlement.paidByUserName} paid {settlement.paidToUserName}
        </Typography>
      </Box>
    </>
  );
};

export default UserTransactionAvatar;
