import React, { useState, useEffect } from "react";
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
  InputAdornment,
} from "@mui/material";
import UserTransactionAvatar from "./UserTransactionAvatar";

function PaymentDialog({ open, onClose, settlementReq, isModReq }) {

  const [isLoading, setIsLoading] = useState(false);
  const [settlement, setSettlement] = useState({});
  const [isModRequest, setIsModRequest] = useState(isModReq);

  useEffect(() => {
    if (settlementReq) {
      setSettlement(settlementReq);
    }
  }, [settlementReq]);

  const handleSave = () => {
    // Handle save logic here
    setIsLoading(true)
    onClose();
  };

  const handleAmountChange = (e) => {
    setSettlement((prevVal) => ({
      ...prevVal,
      amountPaid: e.target.value,
    }));
  };

  const handleDateChange = (e) => {
    setSettlement((prevVal) => ({
      ...prevVal,
      settlementDate: e.target.value,
    }));
  };

  const handleGroupChange = (e) => {
    setSettlement((prevVal) => ({
      ...prevVal,
      groupName: e.target.value,
    }));
  };

  const handlePaymentMethodChange = (e) => {
    setSettlement((prevVal) => ({
      ...prevVal,
      paymentMethod: e.target.value,
    }));
  };
  
  const getISOdate = (dateStr) =>{
      return dateStr.split("T")[0];
  }
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isModReq ? "Modify Payment" : "New Payment"}</DialogTitle>
      <DialogContent>
        <UserTransactionAvatar
          settlement={settlement}
          setSettlement={setSettlement}
        />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography>Amount</Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={settlement.amountPaid || ''}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">₹</InputAdornment>
                ),
              }}
              onChange={handleAmountChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography>Date</Typography>
            <TextField
              fullWidth
              type="date"
              value={settlement.settlementDate ? getISOdate(settlement.settlementDate): ''}
              onChange={handleDateChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography>Group</Typography>
            <FormControl fullWidth>
              <Select
                value={settlement.groupName || ''}
                onChange={handleGroupChange}
                label="Within Group"
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
                value={settlement.paymentMethod || ''}
                onChange={handlePaymentMethodChange}
              >
                <FormControlLabel
                  value={isModRequest ? settlement.paymentMethod : "cash"}
                  control={<Radio />}
                  label="Cash"
                />
                <FormControlLabel
                  value="UPI"
                  control={<Radio />}
                  label="UPI"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          {isLoading ? "Saving..." : isModRequest ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PaymentDialog;