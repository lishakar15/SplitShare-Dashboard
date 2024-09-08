import React, { useState } from "react";
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
  userName,
  amount,
  handleUserCardDelete,
  handleUserAmountChange,
  allowCustomInput,
}) => {
  const [amountVal, setAmountVal] = useState(amount);
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
              }
            }
              onChange={(e) => setAmountVal(e.target.value)}
              onBlur={()=>handleUserAmountChange(amountVal)}
              sx={{width:"130px"}}
            />
          ) : (
            <Typography>₹{amountVal}</Typography>
          )}

          <Divider
            orientation="vertical"
            sx={{
              height: 28,
              mx: 2,
            }}
          />
          <GoTrash
            style={{ fontSize: "20px" }}
            onClick={() => handleUserCardDelete(userName)}
            value={userName}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserDataCard;
