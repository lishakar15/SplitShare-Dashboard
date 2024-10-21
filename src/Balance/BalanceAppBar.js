import { Box, Typography } from '@mui/material';
import React from 'react';
import SettleUpButton from '../SettleUpButton';
import AddExpenseDialog from '../Expense/Create Expense/AddExpenseButton';


const BalanceAppBar = () => {
  return (
    <Box container sx={{my:4,display:"flex", alignItems:"center",justifyContent:"space-between"}}>
      <Typography variant='div'sx={{fontSize: 20}} >Balances</Typography >
      <Box sx={{display:"flex",justifyContent:"space-around"}}> 
      <AddExpenseDialog/>
      <SettleUpButton/>
      </Box>
      
    </Box>
  )
}

export default BalanceAppBar;
