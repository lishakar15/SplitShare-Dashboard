import React, { useState, forwardRef } from 'react';
import { Box, Button } from '@mui/material';
import EastIcon from '@mui/icons-material/East';
import PaymentDialog from './PaymentDialog';
import { loggedInUserAtom } from '../atoms/UserAtom';
import { useAtomValue } from 'jotai';

const CustomSettleUpButton = forwardRef(({ balance }, ref) => {
  const [open, setOpen] = useState(false);
  const [settlementRequest, setSettlementRequest] = useState(null);
  const loggedInUser = useAtomValue(loggedInUserAtom);

  const handleClickOpen = () => {
    const settlementReq = createSettlementRequest();
    if (settlementReq) {
      setSettlementRequest(settlementReq);
    }
    setOpen(true);
  };

  const createSettlementRequest = () => {
    if (balance) {
      const settlementReq = {
        groupId: balance.groupId,
        groupName: balance.groupName,
        paidBy: balance.userId,
        paidByUserName: balance.userName,
        paidTo: balance.owesTo,
        paidToUserName: balance.owesToUserName,
        createdBy: loggedInUser.userId,
        amountPaid: balance.balanceAmount,
      };
      return settlementReq;
    } else {
      return null;
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
        <Button
          ref={ref} // Forwarding the ref here
          onClick={handleClickOpen}
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
          Settle up
          <EastIcon sx={{ fontSize: '15px', ml: '5px' }} />
        </Button>
      <PaymentDialog open={open} onClose={handleClose} settlementReq={settlementRequest} />
    </Box>
  );
});

export default CustomSettleUpButton;
