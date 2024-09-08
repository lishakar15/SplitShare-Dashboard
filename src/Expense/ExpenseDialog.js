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
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from "@mui/material";
import PaidUsersSection from "./PaidUsersSection";
import SplitAmountSection from "./SplitAmountSection";

function ExpenseDialog({
  open,
  onClose,
  payerName,
  receiverName,
  payableAmount,
}) {
  const [payer, setPayer] = useState(payerName);
  const [receiver, setReceiver] = useState(receiverName);
  const [amount, setAmount] = useState(payableAmount);
  const [date, setDate] = useState("");
  const [group, setGroup] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");

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
              value={amount}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">₹</InputAdornment>
                  ),
                },
              }}
              onChange={(e) => setAmount(e.target.value)}
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
              <Select
                value={group}
                onChange={(e) => setGroup(e.target.value)}
                >
                <MenuItem value="">--select---</MenuItem>
                <MenuItem value="Food">Food</MenuItem>
                <MenuItem value="Entertainment">Entertainment</MenuItem>
                <MenuItem value="Restaurant">Restaurant</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <PaidUsersSection payer={"Sovon"} />
          <SplitAmountSection/>
          <Grid item xs={12}>
            <Typography>Group</Typography>
            <FormControl fullWidth>
              <Select
                value={group}
                onChange={(e) => setGroup(e.target.value)}
              >
                <MenuItem value="Cognizant Team">Cognizant Team</MenuItem>
                {/* Add other groups */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <RadioGroup
                row
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel
                  value="Cash"
                  control={<Radio />}
                  label="Cash"
                />
                <FormControlLabel value="UPI" control={<Radio />} label="UPI" />
              </RadioGroup>
            </FormControl>
          </Grid>
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
