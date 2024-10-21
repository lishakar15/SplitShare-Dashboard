import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import { useSetAtom } from 'jotai';
import { useRef, useEffect } from 'react';
import { settleButtonRefAtom } from './atoms/ExpenseAtom';
import CustomizedSnackbars from './utilities/CustomSnackBar';
const SettleUpButton = () => {

  const settleButtonRef = useRef(null);
  const setSettleButtonReference = useSetAtom(settleButtonRefAtom);
    // Snackbar state
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSuccess, setSnackbarSuccess] = useState(false);

  useEffect(() => {
    setSettleButtonReference(settleButtonRef);
  }, [setSettleButtonReference]);
  const handleClick = () => {
    if (settleButtonRef.current) {
      settleButtonRef.current.click();
    }
    else {
      //No more Balances. All Balances Settled
      setSnackbarMessage("You are fully Settled up");
      setSnackbarSuccess(true);
      setSnackbarOpen(true);
    }
  };

  return (
    <>
      <Box>
        <Button variant="contained" onClick={handleClick}
          sx={{ textTransform: 'none', bgcolor: "#e0e7ff", color: "#4338ca", ml: 2 }}>
          Settle Up
        </Button>
      </Box>
      <CustomizedSnackbars
        open={snackbarOpen}
        setOpen={setSnackbarOpen}
        message={snackbarMessage}
        isSuccess={snackbarSuccess}
      />

    </>

  )
}

export default SettleUpButton;
