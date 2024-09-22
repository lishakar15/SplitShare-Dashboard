import React from 'react';
import { Box, Button } from '@mui/material';
import EastIcon from '@mui/icons-material/East';
import PaymentDialog from './PaymentDialog';
import { SETTLEMENT_DATA } from '../data/SettlementData';

const CustomSettleUpButton = () => {
   
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box>
        <Button onClick={handleClickOpen}
        variant="outlined"
        sx={{
        width: '100%',
        justifyContent: 'flex-start',
        border: 'none',
        textTransform: 'none',
        color: 'black',
        mt: 'auto',
        }}
    >
        Settle up<EastIcon sx={{ fontSize: '15px', ml: '5px' }} />
    </Button>
    <PaymentDialog
      open={open}
      onClose={handleClose}
      settlementReq={SETTLEMENT_DATA[1]}
    />
  </Box>
  )
}

export default CustomSettleUpButton;
