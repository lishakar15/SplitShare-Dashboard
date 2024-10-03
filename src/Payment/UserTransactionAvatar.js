import React from "react";
import { Box, Button, Typography } from "@mui/material";
import AvatarGenerator from "../AvatarGenerator";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

const UserTransactionAvatar = ({ paidByUserName, paidToUserName, handlePayerExchange }) => {
  

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
          <AvatarGenerator userName={paidByUserName} size="md" />
          <Button onClick={() => handlePayerExchange()}>
            <SwapHorizIcon fontSize="large"></SwapHorizIcon>
          </Button>
          <AvatarGenerator userName={paidToUserName} size="md" />
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h5" gutterBottom>
          {paidByUserName} paid {paidToUserName}
        </Typography>
      </Box>
    </>
  );
};

export default UserTransactionAvatar;
