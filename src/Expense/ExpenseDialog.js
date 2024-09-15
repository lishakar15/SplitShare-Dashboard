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
} from "@mui/material";
import PaidUsersSection from "./PaidUsersSection";
import SplitAmountSection from "./SplitAmountSection";
import { backendService } from "../services/backendServices";
import { useAtom } from "jotai";
import {
  defaultPaidUserAtom,
  totalExpenseAmountAtom,
  participantShareListAtom,
  paidUsersAtom,
  splitTypeAtom,
} from "../atoms/ExpenseAtom";

function ExpenseDialog({ open, onClose, payerName, receiverName }) {
  const [totalAmount, setTotalAmount] = useAtom(totalExpenseAmountAtom);
  const [payer, setPayer] = useState(payerName);
  const [receiver, setReceiver] = useState(receiverName);
  const [expenseDescription, setExpenseDescription] = useState("");
  const [spentOnDate, setSpentOnDate] = useState(null);
  const [createDate, setCreateDate] = useState(null);
  const [category, setCategory] = useState(null);
  const [group, setGroup] = useState("Cognizant Group");

  const [participantShareList, setParticipantShareList] = useAtom(
    participantShareListAtom
  );
  const [defaultPayer,setDefaultPayer] = useAtom(defaultPaidUserAtom);
  const [paidUsers,setPaidUsers] = useAtom(paidUsersAtom);
  const [splitType,setSplitType] = useAtom(splitTypeAtom);

  const handleSave = async () => {
    //Validate the data before saving
    const expenseRequest = createExpenseRequest();
    if (validateExpenseRequest) {
      const isSavedSuccessfully = await backendService.saveExpenseDetails(
        expenseRequest
      );
      if (isSavedSuccessfully) {
        console.log("Saved successfully");
        //Show succcess message in MUI snackbar
      } else {
        console.log("Error occured while saving data");
      }
      //invalidateAtoms();
      handleClose();
    }
  };

  const createExpenseRequest = () => {

      const participantShares = participantShareList.map((participant) => {
        const isUserExists = paidUsers.some(
          (paidUser) => paidUser.userId === participant.userId
        );
        return isUserExists
          ? { ...participant, isPaidUser: true }
          : { ...participant, isPaidUser: false };
      })

    const expenseRequest = {
      groupId: 1,
      paidUsers,
      totalAmount,
      expenseDescription,
      spentOnDate,
      createDate: createDate ? createDate : new Date().toISOString(),
      lastUpdateDate: new Date().toISOString(),
      category,
      splitType,
      createdBy: 101,
      participantShareList:participantShares,
    };
    return expenseRequest;
  };
  const validateExpenseRequest = (expenseRequest) => {
    //Perform validation here

    return true;
  };
  const invalidateAtoms = ()=>{
    setTotalAmount(0);
    setParticipantShareList([])
    //setDefaultPayer([]) --Need to enable it once logged in default user implemented
    setPaidUsers([]);
    setSplitType("EQUAL"); //Default Split Type
  }

  const handleClose = () => {
    onClose();
  };
  const handlePayerChange = () => {
    setPayer(receiver);
    setReceiver(payer);
  };

  const handleTotalChange = (newAmount) => {
    setTotalAmount(newAmount);
  };

  useEffect(() => {
    const defaultPayer = {
      //Need to get it from current logged in user atom
      userId: 101,
      userName: "Lisha",
      paidAmount: totalAmount,
    };
    const defaultParticipant = {
      userId: 101,
      userName: "Lisha",
      shareAmount: totalAmount,
    };
    setDefaultPayer(defaultPayer);
    setParticipantShareList([defaultParticipant]);
  }, []);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>New Expense</DialogTitle>
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
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">₹</InputAdornment>
                  ),
                },
              }}
              onChange={(e) => handleTotalChange(e.target.value)}
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
          <SplitAmountSection group={group} />
          <Divider sx={{ flexGrow: 1, my: 2, width: "100%" }} />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default ExpenseDialog;
