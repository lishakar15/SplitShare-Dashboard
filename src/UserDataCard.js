import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Divider,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import UserAvatarLabel from "./UserAvatarLabel";
import { GoTrash } from "react-icons/go";

const UserDataCard = ({
  userId,
  userName,
  amount,
  handleUserCardDelete,
  handleUserAmountChange,
  allowCustomInput,
}) => {
  const [amountVal, setAmountVal] = useState(amount);

  useEffect(() => {
    setAmountVal(amount);
  },[amount]);
  return (
    <Card variant="outlined" sx={{ borderRadius: 3 }}>
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <UserAvatarLabel userName={userName} size={"xs"} />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {allowCustomInput ? (
            <TextField
              variant="outlined"
              value={amountVal}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">₹</InputAdornment>
                  ),
                },
              }}
              onChange={(e) => setAmountVal(e.target.value)}
              onBlur={() => handleUserAmountChange(amountVal,userId)}
              sx={{ width: "130px" }}
            />
          ) : (
            <Typography>₹{amountVal ? Number(amountVal).toFixed(2) : '0.00'}</Typography>
          )}

          <Divider
            orientation="vertical"
            sx={{
              height: 28,
              mx: 2,
            }}
          />
          <GoTrash
            style={{ fontSize: "20px",cursor:"pointer"}}
            onClick={() => handleUserCardDelete(userId)}
            value={userName}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserDataCard;
