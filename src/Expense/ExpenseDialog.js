import * as React from "react";
import { useState } from "react";
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
import { GROUP_MEMBERS_DATA } from "../data/GroupMembersData";



function ExpenseDialog({
  open,
  onClose,
  payerName,
  receiverName,
}) {
  const [payer, setPayer] = useState(payerName);
  const [receiver, setReceiver] = useState(receiverName);
  const [totalAmount, setTotalAmount] = useState(100);
  const [date, setDate] = useState("");
  const [group, setGroup] = useState("Cognizant Group");
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const defaultPayer ={
    userId: 101,
    userName: "Lisha",
    paidAmount:0.00
  }
  const handleSave = () => {
    // Handle save logic here
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
          <PaidUsersSection totalAmount={totalAmount} defaultPayer={defaultPayer} />
          <Divider sx={{ flexGrow: 1, my: 2, width: "100%" }} />
          <SplitAmountSection
            group={group}
            totalAmount={totalAmount}
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
