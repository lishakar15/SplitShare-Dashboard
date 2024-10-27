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
  useTheme,
  useMediaQuery,
} from "@mui/material";
import UserTransactionAvatar from "./UserTransactionAvatar";
import { backendService } from "../services/backendServices";
import { useAtom, useAtomValue } from "jotai";
import { loggedInUserAtom } from "../atoms/UserAtom";
import CustomizedSnackbars from "../utilities/CustomSnackBar";
import { refetchTriggerAtom } from "../atoms/Atoms";

function PaymentDialog({ open, onClose, settlementReq, isModReq }) {

  const [isLoading, setIsLoading] = useState(false);
  const [isModRequest, setIsModRequest] = useState(isModReq);
  const loggedInUser = useAtomValue(loggedInUserAtom);
  const today = new Date().toISOString().split('T')[0];
  const [settlementId, setSettlementId] = useState(null);
  const [groupId, setGroupId] = useState(null);
  const [groupName, setGroupName] = useState(null);
  const [paidBy, setPaidBy] = useState(0);
  const [paidByUserName, setPaidByUserName] = useState(null);
  const [paidTo, setPaidTo] = useState(0);
  const [paidToUserName, setPaidToUserName] = useState(null);
  const [amountPaid, setAmountPaid] = useState(0);
  const [settlementDate, setSettlementDate] = useState(today)
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [refreshTrigger, setRefreshTrigger] = useAtom(refetchTriggerAtom);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSuccess, setSnackbarSuccess] = useState(false);

  useEffect(() => {
    if (settlementReq) {
      unPackExpenseData(settlementReq);
    }
  }, [settlementReq]);

  const handleSave = async () => {

    try {
      setIsLoading(true)
      let isSettlementSaved = false;
      const settlement = populateExpenseData();
      if (isModReq) {
        isSettlementSaved = await backendService.updateSettlement(settlement);
      }
      else {
        isSettlementSaved = await backendService.saveSettlement(settlement);
      }
      if (isSettlementSaved) {
        setSnackbarMessage("Payment Saved Successfully");
        setSnackbarSuccess(true);
        setSnackbarOpen(true);
        setTimeout(() => { setRefreshTrigger((prevVal) => !prevVal) }, 1000)
      }
      else {
        setSnackbarMessage("Error Saving Payment");
        setSnackbarSuccess(true);
        setSnackbarOpen(true);
      }
    }
    catch (err) {
      console.log("Error occurred while saving Settlement data" + err);
    }
    finally {
      setIsLoading(false);
      onClose();
    }
  };

  const populateExpenseData = () => {
    if (settlementReq != null) {
      const settlement = {
        settlementId: settlementId,
        groupId: groupId,
        paidBy: paidBy,
        paidTo: paidTo,
        createdBy: loggedInUser.userId,
        modifiedBy: isModReq ? loggedInUser.userId : null,
        amountPaid: amountPaid,
        paymentMethod: paymentMethod,
        settlementDate: settlementDate,
        lastUpdateDate: today,
      }
      return settlement;
    }
  }

  const unPackExpenseData = (settlementRequest) => {
    setSettlementId(settlementRequest.settlementId)
    setGroupId(settlementRequest.groupId);
    setGroupName(settlementRequest.groupName);
    setPaidBy(settlementRequest.paidBy);
    setPaidByUserName(settlementRequest.paidByUserName);
    setPaidTo(settlementRequest.paidTo);
    setPaidToUserName(settlementRequest.paidToUserName);
    setAmountPaid(settlementRequest.amountPaid ? settlementRequest.amountPaid.toFixed(2) : 0.00);
    if (settlementRequest.paymentMethod) {
      setPaymentMethod(settlementRequest.paymentMethod);
    }
    if (settlementRequest.settlementDate) {
      const settleDate = settlementRequest.settlementDate.split('T')[0]
      setSettlementDate(settleDate);
    }


  }

  const handleDeleteSettlement = async (settlementId) => {
    try {
      const isSettlementDeleted = await backendService.deleteSettlement(settlementId, loggedInUser.userId);
      if (isSettlementDeleted) {
        setSnackbarMessage("Payment Deleted Successfully");
        setSnackbarSuccess(true);
        setSnackbarOpen(true);
        setTimeout(() => { setRefreshTrigger((prevVal) => !prevVal) }, 1000)
      }
      else {
        setSnackbarMessage("Error Deleting Payment");
        setSnackbarSuccess(false);
        setSnackbarOpen(true);
      }
    }
    catch (err) {
      setSnackbarMessage("Error Deleting Payment");
      setSnackbarSuccess(false);
      setSnackbarOpen(true);
      console.log("Error occurred while deleting Settlement " + settlementId);
    }
    finally {
      onClose();
    }
  }

  const handleAmountChange = (e) => {
    setAmountPaid(e.target.value);
  };

  const handleDateChange = (e) => {
    setSettlementDate(e.target.value);
  };

  const handleGroupChange = (e) => {
    setGroupId(e.target.value);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };
  const handlePayerExchange = () => {

    const tempPaidUserId = paidBy;
    setPaidBy(paidTo);
    setPaidTo(tempPaidUserId);
    const tempPaidUserName = paidByUserName;
    setPaidByUserName(paidToUserName);
    setPaidToUserName(tempPaidUserName)
  };

  const getISOdate = (dateStr) => {
    return dateStr.split("T")[0];
  }
  return (
    <>
      <Dialog open={open} onClose={onClose} 
        PaperProps={{
          sx: {
            width: '100vw',
            height: 'auto',
            maxHeight: '90vh',
            margin: 0,
          },
        }}
      >
        <DialogTitle>{isModReq ? "Modify Payment" : "New Payment"}</DialogTitle>
        <DialogContent>
          <UserTransactionAvatar
            paidByUserName={paidByUserName}
            paidToUserName={paidToUserName}
            handlePayerExchange={handlePayerExchange}
          />
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography>Amount</Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={amountPaid}
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
                value={settlementDate}
                onChange={handleDateChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>Group</Typography>
              <FormControl fullWidth>
                <Select
                  value={groupId}
                  onChange={(e) => handleGroupChange(e.target.value)}
                >
                  <MenuItem key={groupId} value={groupId}>{groupName}</MenuItem>
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
                      value={paymentMethod}
                      onChange={handlePaymentMethodChange}
                    >
                      <FormControlLabel
                        value={'cash'}
                        name={"paymentType"}
                        control={<Radio />}
                        label="Cash"
                      />
                      <FormControlLabel
                        value="upi"
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', m: 1, gap: isMobile ? 1 :2  }}>
            <Button onClick={() => handleDeleteSettlement(settlementId)} variant="contained" color="error" disabled={isLoading || !isModReq}>
              Delete
            </Button>
            <Box sx={{ display: "flex", gap: isMobile ? 1 :2 }}>
              <Button onClick={onClose} variant="outlined" disabled={isLoading}>Cancel</Button>
              <Button onClick={handleSave} variant="contained" color="primary" disabled={isLoading}>
                {isLoading ? "Saving..." : isModRequest ? "Update" : "Create"}
              </Button>
            </Box>
          </Box>
        </DialogActions>
      </Dialog>
      <CustomizedSnackbars
        open={snackbarOpen}
        setOpen={setSnackbarOpen}
        message={snackbarMessage}
        isSuccess={snackbarSuccess}
      />
    </>
  );
}

export default PaymentDialog;