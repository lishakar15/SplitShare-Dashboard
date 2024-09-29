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
  Box,
} from "@mui/material";
import UserTransactionAvatar from "./UserTransactionAvatar";
import { backendService } from "../services/backendServices";
import { useAtomValue } from "jotai";
import { loggedInUserAtom } from "../atoms/UserAtom";

function PaymentDialog({ open, onClose, settlementReq, isModReq }) {

  const [isLoading, setIsLoading] = useState(false);
  const [settlement, setSettlement] = useState({});
  const [isModRequest, setIsModRequest] = useState(isModReq);
  const loggedInUser = useAtomValue(loggedInUserAtom);

  useEffect(() => {
    if (settlementReq) {
      setSettlement(settlementReq);
    }
  }, [settlementReq]);

  const handleSave = async () => {

    try {
      setIsLoading(true)
      let isSettlementSaved = false;
      if(isModReq)
      {
        isSettlementSaved = await backendService.updateSettlement(settlement);
      }
      else{
        isSettlementSaved = await backendService.saveSettlement(settlement);
      }
      if (isSettlementSaved) {
        //show Succcess Snack Bar
      }
      else {
        //Error Snack Bar
      }
    }
    catch (err) {
      console.log("Error occurred while saving Settlement data" + err);
    }
    finally {
      setIsLoading(false)
      onClose();
    }
  };

  const handleDeleteSettlement = async (settlementId) => {
      try{
          const isSettlementDeleted = await backendService.deleteSettlement(settlementId,loggedInUser.userId);
          if(isSettlementDeleted)
          {
            //Show success Snack Bar
          }
          else{
            //Show error Snack Bar
          }
      }
      catch(err)
      {
        //Show Error Snack Bar
        console.log("Error occurred while deleting Settlement "+settlementId);
      }
      finally {
        onClose();
      }
  }

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

  const getISOdate = (dateStr) => {
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
              value={settlement.settlementDate ? getISOdate(settlement.settlementDate) : ''}
              onChange={handleDateChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography>Group</Typography>
            <FormControl fullWidth>
              <Select
                value={settlement.groupId || ''}
                onChange={(e) => handleGroupChange(e.target.value)}
              >
                <MenuItem key={settlement.groupId} value={settlement.groupId}>{settlement.groupName}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Grid item xs={6}>
                <Typography>Payment Method</Typography>
              </Grid>
              <Grid item xs={6}>
                <FormControl component="fieldset">
                  <RadioGroup
                    row
                    value={settlement.paymentMethod || ''}
                    onChange={handlePaymentMethodChange}
                  >
                    <FormControlLabel
                      value={'Cash'}
                      name={"paymentType"}
                      control={<Radio />}
                      label="Cash"
                    />
                    <FormControlLabel
                      value="UPI"
                      name={"paymentType"}
                      control={<Radio />}
                      label="UPI"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', m: 1 }}>
          <Button onClick={() => handleDeleteSettlement(settlement.settlementId)} variant="contained" color="error" disabled={isLoading || !isModReq}>
            Delete
          </Button>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button onClick={onClose} variant="outlined" disabled={isLoading}>Cancel</Button>
            <Button onClick={handleSave} variant="contained" color="primary" disabled={isLoading}>
              {isLoading ? "Saving..." : isModRequest ? "Update" : "Create"}
            </Button>
          </Box>
        </Box>
      </DialogActions>
    </Dialog>
  );
}

export default PaymentDialog;