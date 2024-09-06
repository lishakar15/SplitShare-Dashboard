import React from "react";
import { Box,Button,Typography} from "@mui/material";
import AvatarGenerator from "../AvatarGenerator";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";


const UserTransactionAvatar = ({payer,receiver,handlePayerChange}) => {

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
          <AvatarGenerator userName={payer} size="md" />
          <Button>
            <SwapHorizIcon
              fontSize="large"
              onClick={() => handlePayerChange()}
            ></SwapHorizIcon>
          </Button>
          <AvatarGenerator userName={receiver} size="md" />
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h5" gutterBottom>
          {payer} paid {receiver}
        </Typography>
      </Box>
    </>
  );
};

export default UserTransactionAvatar;
