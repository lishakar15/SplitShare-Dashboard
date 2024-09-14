import React, { useEffect } from "react";
import { GiReceiveMoney } from "react-icons/gi";
import UserAvatarLabel from "../UserAvatarLabel";
import { useState } from "react";
import {
  Grid,
  Typography,
  Box,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import UserDataCard from "../UserDataCard";
import { PAID_USER_DATA } from "../data/PaidUsersData";
import { useAtom, useAtomValue } from 'jotai';
import { defaultPaidUserAtom } from '../atoms/ExpenseAtom'
import { paidUsersAtom} from '../atoms/ExpenseAtom';

const MultiPaidUser = ({setIsMultiPayer}) => {

  const [isCustomPaidType, setIsCustomPaidType] = useState(false);
  const defaultPayer = useAtomValue(defaultPaidUserAtom);
  const [paidUsers,setPaidUsers] = useAtom(paidUsersAtom);

  const changeToDefaultPayer = (defaultPayer) => {
    setPaidUsers(defaultPayer ? [defaultPayer] : []);
    setIsMultiPayer(false);
  };
  
  const handlePaidTypeChanged = (paidType) => {
    setIsCustomPaidType(paidType === "Custom");
  };
  const handleUserAmountChange = (amountVal) => {}; //Need to do this custom amount update
  const handleUserCardDelete = (deleteUserID) => {
    setPaidUsers(paidUsers.filter((paidUser)=>paidUser.userId !== deleteUserID));
  };
  const handleAddPayers = (newUser) => {
    setPaidUsers([...paidUsers, newUser]);
  };
  return (
    <>
      <Grid item md={5} xs={12}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: { xs: "center", md: "flex-start" },
          }}
        >
          <GiReceiveMoney color="green" size={25} />
          <Typography sx={{ mx: 1, whiteSpace: "nowrap" }}>Paid</Typography>
          <FormControl sx={{ minWidth: 150 }}>
            <Select
              sx={{ maxWidth: 150 }}
              value={isCustomPaidType ? "Custom" : "Equally"}
              onChange={(e) => handlePaidTypeChanged(e.target.value)}
            >
              <MenuItem value="Equally">Equally</MenuItem>
              <MenuItem value="Custom">Custom</MenuItem>
            </Select>
          </FormControl>
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
          <Typography sx={{ whiteSpace: "nowrap" }}>by</Typography>
          <FormControl fullWidth>
            <Select
              value={""}
              onChange={(e) => handleAddPayers(e.target.value)}
            >
              {PAID_USER_DATA.map((user)=>(
                 <MenuItem key={user.userId} value={user}><UserAvatarLabel userName={user.userName} size="xs"/></MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography
            component="a"
            href="#"
            onClick={changeToDefaultPayer}
            sx={{ whiteSpace: "nowrap", cursor: "pointer" }}
          >
            Only I Paid
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} gap={1}>
        {paidUsers.map((paidUser) => (
          <Box sx={{mb:1}}>
            <UserDataCard
              amount={paidUser.paidAmount}
              userName={paidUser.userName}
              userId={paidUser.userId}
              allowCustomInput={isCustomPaidType}
              handleUserAmountChange={handleUserAmountChange}
              handleUserCardDelete={handleUserCardDelete}
            />
          </Box>
        ))}
      </Grid>
    </>
  );
};

export default MultiPaidUser;
