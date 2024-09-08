import React from "react";
import { GiReceiveMoney } from "react-icons/gi";
import UserAvatarLabel from "../UserAvatarLabel";
import {
  Grid,
  Typography,
  Box,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";

const SinglePaidUser = ({
  paidUsers,
  handleChangePayer,
  handleAddPayersButtonClick,
  defaultPayer,
}) => {
  return (
    <>
      <Grid item md={5} xs={12} alignItems="center">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: { xs: "center", md: "flex-start" },
          }}
        >
          <GiReceiveMoney color="green" size={25} />
          <Typography sx={{ mx: 1, whiteSpace: "nowrap" }}>Paid by</Typography>
          {paidUsers.length > 0 ? (
            <UserAvatarLabel userName={paidUsers[0]} size={"xs"} />
          ) : (
              <Typography sx={{ whiteSpace: "nowrap", color: "red" }}>
                Non one
              </Typography>
          )}
        </Box>
      </Grid>

      <Grid item md={7} xs={12}>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            justifyContent: { xs: "center", md: "flex-end" },
          }}
        >
          {paidUsers.length > 0 ? (
            <>
              <Typography
                component="a"
                href="#"
                onClick={() => handleChangePayer(null)}
                sx={{ whiteSpace: "nowrap", cursor: "pointer" }}
              >
                Change Payer
              </Typography>
              <Typography
                component="a"
                href="#"
                onClick={handleAddPayersButtonClick}
                sx={{ whiteSpace: "nowrap", cursor: "pointer" }}
              >
                Add Payers
              </Typography>
            </>
          ) : (
            <>
              <FormControl fullWidth>
                <Select
                  value={""}
                  onChange={(e) => handleChangePayer(e.target.value)}
                >
                  <MenuItem value="Lishakar">Lishakar</MenuItem>
                </Select>
              </FormControl>
              <Typography
                component="a"
                href="#"
                onClick={() => handleChangePayer(defaultPayer)}
                sx={{ whiteSpace: "nowrap", cursor: "pointer" }}
              >
                Only I Paid
              </Typography>
            </>
          )}
        </Box>
      </Grid>
      </>
  );
};

export default SinglePaidUser;
