import React from 'react';
import { Box, Button } from '@mui/material';
import ExpenseDialog from './ExpenseDialog';

const AddExpenseDialog = ({groupData}) => {
   
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box>
      <Button variant="contained" sx={{ textTransform: 'none', bgcolor:"#4338ca" }} onClick={()=>handleClickOpen(true)}>New Expense</Button>
    <ExpenseDialog
      open={open}
      onClose={handleClose}
      payerName={"Andy"}
      receiverName={"Steve"}
      payableAmount={15}
      groupData={groupData}
    />
  </Box>
  )
}

export default AddExpenseDialog;
