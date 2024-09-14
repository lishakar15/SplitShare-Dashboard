import * as React from "react";
import { useState,useEffect } from "react";
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
import { useAtom, useSetAtom } from "jotai";
import { defaultPaidUserAtom,totalExpenseAmountAtom,participantShareListAtom} from "../atoms/ExpenseAtom";



function ExpenseDialog({
  open,
  onClose,
  payerName,
  receiverName,
}) {
  
  const [totalAmount, setTotalAmount] = useAtom(totalExpenseAmountAtom)
  const [payer, setPayer] = useState(payerName);
  const [receiver, setReceiver] = useState(receiverName);
  const [date, setDate] = useState("");
  const [group, setGroup] = useState("Cognizant Group");
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const defaultPayer ={ //Need to get it from current logged in user atom
    userId: 101,
    userName: "Lisha",
    paidAmount:totalAmount
  }
  const defaultParticipant= {
    userId: 101,
    userName: "Lisha",
    splitAmount: totalAmount,
  };
  const setDefaultPayer = useSetAtom(defaultPaidUserAtom);
  setDefaultPayer(defaultPayer);

  const setParticipantShareList = useSetAtom(participantShareListAtom);
  setParticipantShareList([defaultParticipant]);

  const handleSave = () => {
    // Handle save logic here
    //Make API call here
    handleClose();
  };

  const handleClose = () => {
    onClose();
  };
  const handlePayerChange = () => {
    setPayer(receiver);
    setReceiver(payer);
  };

  const handleTotalChange = (newAmount)=>{
    setTotalAmount(newAmount)
  }

  useEffect(()=>{
    const getDogs = async ()=>{
      const response = await backendService.getDogsData();
    console.log("Response  = "+JSON.stringify(response));
    }
    getDogs();
    
  },[])

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
              value={date}
              onChange={(e) => setDate(e.target.value)}
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
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography>Category</Typography>
            <FormControl fullWidth>
              <Select value={group} onChange={(e) => setGroup(e.target.value)}>
                <MenuItem value="">--select---</MenuItem>
                <MenuItem value="Food">Food</MenuItem>
                <MenuItem value="Entertainment">Entertainment</MenuItem>
                <MenuItem value="Restaurant">Restaurant</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Divider sx={{ flexGrow: 1, my: 2, width: "100%" }} />
          <PaidUsersSection/>
          <Divider sx={{ flexGrow: 1, my: 2, width: "100%" }} />
          <SplitAmountSection
            group={group}
          />
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
