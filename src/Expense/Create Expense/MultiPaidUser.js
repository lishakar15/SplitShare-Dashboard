import React, { useEffect } from "react";
import { GiReceiveMoney } from "react-icons/gi";
import UserAvatarLabel from "../../UserAvatarLabel";
import { useState } from "react";
import {
  Grid,
  Typography,
  Box,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import UserDataCard from "../../UserDataCard";
import { useAtom, useAtomValue } from "jotai";
import { defaultPaidUserAtom } from "../../atoms/ExpenseAtom";
import { paidUsersAtom } from "../../atoms/ExpenseAtom";
import { totalExpenseAmountAtom } from "../../atoms/ExpenseAtom";
import { GROUP_MEMBERS_DATA } from "../../data/GroupMembersData";
import { groupMembersAtom } from "../../atoms/GroupAtom";

const MultiPaidUser = ({ setIsMultiPayer }) => {
  const [isCustomPaidType, setIsCustomPaidType] = useState(false);
  const defaultPayer = useAtomValue(defaultPaidUserAtom);
  const [paidUsers, setPaidUsers] = useAtom(paidUsersAtom);
  const totalAmount = useAtomValue(totalExpenseAmountAtom);
  const groupMembers = useAtomValue(groupMembersAtom);


  const changeToDefaultPayer = () => {
    setPaidUsers(defaultPayer ? [defaultPayer] : []);
    setIsMultiPayer(false);
  };

  const handlePaidTypeChanged = (paidType) => {
    setIsCustomPaidType(paidType === "Custom");
  };
  const handleUserAmountChange = (amountVal,userId) => {
    setPaidUsers(paidUsers.map((user)=>(user.userId===userId)? {...user,paidAmount:amountVal}:{...user}))
  }; 
  const handleUserCardDelete = (deleteUserID) => {
    setPaidUsers(
      paidUsers.filter((paidUser) => paidUser.userId !== deleteUserID)
    );
  };
  const handleAddPayers = (newUser) => {
    const isExistingUser = paidUsers.some(
      (user) => user.userId === newUser.userId
    );
    if (!isExistingUser) {
      const newPayer = { ...newUser, paidAmount: 0 };
      setPaidUsers([...paidUsers, newPayer]);
    }
  };
  const calculateEqualPayment = () => {
    console.log("doClacukate")
    const averageAmount =
      totalAmount > 0 && paidUsers && paidUsers.length > 0
        ? totalAmount / paidUsers.length
        : 0;
    setPaidUsers(
      paidUsers.map((user) => ({ ...user, paidAmount: averageAmount }))
    );
  };

  useEffect(() => {
    calculateEqualPayment();
  }, [paidUsers.length,totalAmount,isCustomPaidType]);
  
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
              {groupMembers && groupMembers.map((user) => (
                <MenuItem key={user.userId} value={user}>
                  <UserAvatarLabel userName={user.userName} size="xs" />
                </MenuItem>
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
          <Box sx={{ mb: 1 }}>
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
