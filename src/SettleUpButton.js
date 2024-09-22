import React from 'react';
import PaymentDialog from './Payment/PaymentDialog';
import { Box, Button } from '@mui/material';
import { SETTLEMENT_DATA } from './data/SettlementData';
const SettleUpButton = () => {
   
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box>
    <Button variant="contained" onClick={handleClickOpen} 
    sx={{ textTransform: 'none',bgcolor:"#e0e7ff", color :"#4338ca",ml:2 }}>Settle Up</Button>
    
    <PaymentDialog
      open={open}
      onClose={handleClose}
      settlementReq={SETTLEMENT_DATA[0]}
    />
  </Box>
  )
}

export default SettleUpButton;
