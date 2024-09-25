import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  Grid,
  Typography,
  Divider,
} from "@mui/material";
import PaidUsersSection from "./PaidUsersSection";
import SplitAmountSection from "./SplitAmountSection";
import { backendService } from "../../services/backendServices";
import { useAtom,useAtomValue,useSetAtom } from "jotai";
import {
  defaultPaidUserAtom,
  totalExpenseAmountAtom,
  participantShareListAtom,
  paidUsersAtom,
  splitTypeAtom,
} from "../../atoms/ExpenseAtom";

import { groupMembersAtom } from "../../atoms/GroupAtom";
import { loggedInUserAtom } from "../../atoms/UserAtom";

function ExpenseDialog({ open, onClose, isModReq, expenseData, groupData}) {
  const [isLoading, setIsLoading] = useState(false);
  const [expenseId, setExpenseId] = useState(null);
  const [totalAmount, setTotalAmount] = useAtom(totalExpenseAmountAtom);
  const [expenseDescription, setExpenseDescription] = useState("");
  const [spentOnDate, setSpentOnDate] = useState(null);
  const [createDate, setCreateDate] = useState(null);
  const [category, setCategory] = useState("");
  const [groupId, setGroupId] = useState(101); // Adjust as per real group id
  const [createdBy, setCreatedBy] = useState(101); // Update with logged-in user
  const [isModRequest, setIsModRequest] = useState(isModReq);

  const [participantShareList, setParticipantShareList] = useAtom(participantShareListAtom);
  const [defaultPayer, setDefaultPayer] = useAtom(defaultPaidUserAtom);
  const [paidUsers, setPaidUsers] = useAtom(paidUsersAtom);
  const [splitType, setSplitType] = useAtom(splitTypeAtom);
  const loggedInUser = useAtomValue(loggedInUserAtom);
  const setGroupMembers = useSetAtom(groupMembersAtom);

  useEffect(() => {
    if (isModRequest && expenseData) {
      populateExpenseData(expenseData);
    }
  }, [isModRequest, expenseData]);

  useEffect(() => {
    if(groupData){
      setGroupMembers(groupData.groupMembers);
    }
  },[groupData]);

  useEffect(()=>{
    const defaultParticipant = {
      userId: loggedInUser.userId,
      userName: loggedInUser.userName,
      shareAmount: totalAmount,
    };
    setParticipantShareList([defaultParticipant]);
  },[])

  const handleSave = async () => {
    const expenseRequest = createExpenseRequest();

    if (validateExpenseRequest(expenseRequest)) {
      setIsLoading(true);
      try {
        const isSavedSuccessfully = await backendService.saveExpenseDetails(expenseRequest);
        if (isSavedSuccessfully) {
          console.log("Saved successfully");
          // Show success message in MUI snackbar
          handleClose();
        } else {
          console.log("Error occurred while saving data");
          // Optionally display error snackbar
        }
      } catch (error) {
        console.error("Error during save:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("Validation failed");
    }
  };

  const createExpenseRequest = () => {
    const participantShares = participantShareList.map((participant) => {
      const isUserExists = paidUsers.some((paidUser) => paidUser.userId === participant.userId);
      return {
        ...participant,
        isPaidUser: isUserExists,
      };
    });

    return {
      groupId,
      paidUsers,
      totalAmount,
      expenseDescription,
      spentOnDate,
      createDate: createDate ? createDate : new Date().toISOString(),
      lastUpdateDate: new Date().toISOString(),
      category,
      splitType,
      createdBy,
      participantShareList: participantShares,
    };
  };

  const validateExpenseRequest = (expenseRequest) => {
    // Perform validation
    if (!expenseRequest.totalAmount || expenseRequest.totalAmount <= 0) {
      console.error("Total amount should be greater than 0");
      return false;
    }
    if (!expenseRequest.expenseDescription) {
      console.error("Expense description is required");
      return false;
    }
    return true;
  };

  const invalidateAtoms = () => {
    setTotalAmount(0);
    setParticipantShareList([]);
    setPaidUsers([]);
    setSplitType("EQUAL"); // Default Split Type
  };

  const handleClose = () => {
    invalidateAtoms();
    onClose();
  };

  const populateExpenseData = (expense) => {
    if (expenseData) {
      setExpenseId(expense.expenseId);
      setExpenseDescription(expense.expenseDescription);
      setTotalAmount(expense.totalAmount);
      const dateString = expense.spentOnDate;
      const formattedDate = dateString.split("T")[0];
      setSpentOnDate(formattedDate);
      setCreateDate(expense.createDate);
      setCategory(expense.category);
      setSplitType(expense.splitType);
      setGroupId(expense.groupId);
      setCreatedBy(expense.createdBy);
      setPaidUsers(expense.paidUsers);
      setParticipantShareList(expense.participantShareList);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{isModRequest ? "Modify Expense" : "New Expense"}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Typography>Description</Typography>
            <TextField
              fullWidth
              type="text"
              value={expenseDescription}
              onChange={(e) => setExpenseDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography>Amount</Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={totalAmount}
              InputProps={{
                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
              }}
              onChange={(e) => setTotalAmount(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography>Date</Typography>
            <TextField
              fullWidth
              type="date"
              value={spentOnDate}
              onChange={(e) => setSpentOnDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography>Category</Typography>
            <FormControl fullWidth>
              <Select value={category} onChange={(e) => setCategory(e.target.value)}>
                <MenuItem value="Food">🍱 Food</MenuItem>
                <MenuItem value="Entertainment">🎞️ Entertainment</MenuItem>
                <MenuItem value="Restaurant">🍴 Restaurant</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Divider sx={{ flexGrow: 1, my: 2, width: "100%" }} />
          <PaidUsersSection />
          <Divider sx={{ flexGrow: 1, my: 2, width: "100%" }} />
          <SplitAmountSection groupData={groupData} setGroupId={setGroupId} />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={isLoading}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="primary" disabled={isLoading}>
          {isLoading ? "Saving..." : isModRequest ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ExpenseDialog;
