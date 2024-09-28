import * as React from "react";
import { useState, useEffect } from "react";
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
  Box,
} from "@mui/material";
import PaidUsersSection from "./PaidUsersSection";
import SplitAmountSection from "./SplitAmountSection";
import { backendService } from "../../services/backendServices";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  defaultPaidUserAtom,
  totalExpenseAmountAtom,
  participantShareListAtom,
  paidUsersAtom,
  splitTypeAtom,
} from "../../atoms/ExpenseAtom";

import { currentGroupDataAtom, groupMembersAtom } from "../../atoms/GroupAtom";
import { loggedInUserAtom } from "../../atoms/UserAtom";

function ExpenseDialog({ open, onClose, isModReq, expenseData, refreshExpenses}) {
  const [isLoading, setIsLoading] = useState(false);
  const [expenseId, setExpenseId] = useState(null);
  const [totalAmount, setTotalAmount] = useAtom(totalExpenseAmountAtom);
  const [expenseDescription, setExpenseDescription] = useState("");
  const [spentOnDate, setSpentOnDate] = useState(null);
  const [createDate, setCreateDate] = useState(null);
  const [category, setCategory] = useState("");
  const [isModRequest, setIsModRequest] = useState(isModReq);
  const [participantShareList, setParticipantShareList] = useAtom(participantShareListAtom);
  const setDefaultPayer = useSetAtom(defaultPaidUserAtom);
  const [paidUsers, setPaidUsers] = useAtom(paidUsersAtom);
  const [splitType, setSplitType] = useAtom(splitTypeAtom);
  const loggedInUser = useAtomValue(loggedInUserAtom);
  const setGroupMembers = useSetAtom(groupMembersAtom);
  const groupData = useAtomValue(currentGroupDataAtom);
  const [groupId, setGroupId] = useState(null);
  const [createdBy, setCreatedBy] = useState(loggedInUser.userId);

  const defaultParticipant = {
    userId: loggedInUser.userId,
    userName: loggedInUser.userName,
    shareAmount: totalAmount,
  };

  const defaultPayer = {
    userId: loggedInUser.userId,
    userName: loggedInUser.userName,
    paidAmount: totalAmount
  };
  useEffect(() => {
    if (isModRequest && expenseData && open) {
      populateExpenseData(expenseData);
    }
  }, [isModRequest, expenseData, open]);

  useEffect(() => {
    if (groupData) {
      setGroupMembers(groupData.groupMembers);
    }
  }, [groupData]);

  useEffect(() => {
    if (!isModReq) {
      setParticipantShareList([defaultParticipant]);
      setDefaultPayer(defaultPayer)
    }
  }, [])

  const handleSave = async () => {
    const expenseRequest = createExpenseRequest();

    if (validateExpenseRequest(expenseRequest)) {
      setIsLoading(true);
      let isSavedSuccessfully = false;
      try {
        if (isModReq) {
          isSavedSuccessfully = await backendService.saveExpenseDetails(expenseRequest);
        }
        else {
          isSavedSuccessfully = await backendService.saveExpenseDetails(expenseRequest);
        }

        if (isSavedSuccessfully) {
          console.log("Saved successfully");
          // Show success message in MUI snackbar
          console.log(refreshExpenses);
          refreshExpenses();
        } else {
          console.log("Error occurred while saving data");
          // Optionally display error snackbar
        }
      } catch (error) {
        console.error("Error during save:", error);
      } finally {
        setIsLoading(false);
        handleClose();
      }
    } else {
      console.log("Validation failed");
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    try {
      const isDeleted = await backendService.deleteExpense(expenseId, loggedInUser.userId)
      if (isDeleted) {
        //Show Success Snack Bar
        console.log(refreshExpenses);
        refreshExpenses();
      }
      else {
        //Show Error Snack Bar
        alert("not deleted")
      }
    }
    catch (err) {
      console.log(err);
    }
    finally {
      handleClose();
    }
  }

  const createExpenseRequest = () => {
    const participantShares = participantShareList.map((participant) => {
      const isUserExists = paidUsers.some((paidUser) => paidUser.userId === participant.userId);
      return {
        ...participant,
        isPaidUser: isUserExists,
      };
    });

    return {
      expenseId,
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
    setParticipantShareList([defaultParticipant]);
    setPaidUsers([defaultPayer]);
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
      const formattedDate = dateString ? dateString.split("T")[0] : null;
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', m: 1 }}>
          <Button onClick={() => handleDeleteExpense(expenseId)} variant="contained" color="error" disabled={isLoading || !isModReq}>
            Delete
          </Button>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button onClick={handleClose} variant="outlined" disabled={isLoading}>Cancel</Button>
            <Button onClick={handleSave} variant="contained" color="primary" disabled={isLoading}>
              {isLoading ? "Saving..." : isModRequest ? "Update" : "Create"}
            </Button>
          </Box>
        </Box>
      </DialogActions>
    </Dialog>
  );
}

export default ExpenseDialog;
