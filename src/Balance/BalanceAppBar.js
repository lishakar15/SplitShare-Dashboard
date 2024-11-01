import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import SettleUpButton from '../SettleUpButton';
import AddExpenseDialog from '../Expense/Create Expense/AddExpenseButton';


const BalanceAppBar = () => {

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box container sx={{my:2,display:"flex", alignItems:"center",justifyContent:"space-between"}}>
      <Typography variant='div'sx={{fontSize: 20}} >Balances</Typography >
      <Box sx={{display:"flex",justifyContent:"space-around"}}> 
      <AddExpenseDialog/>
      {!isSmallScreen && <SettleUpButton/>}
      </Box>
      
    </Box>
  )
}

export default BalanceAppBar;
