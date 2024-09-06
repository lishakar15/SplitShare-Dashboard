import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import SettleUpButton from '../SettleUpButton';


const BalanceAppBar = () => {
  return (
    <Box container sx={{my:4,display:"flex", alignItems:"center",justifyContent:"space-between"}}>
      <Typography variant='div'sx={{fontSize: 20}} >Balances</Typography >
      <Box sx={{display:"flex",justifyContent:"space-around"}}> 
      <Button variant="contained" sx={{ textTransform: 'none', bgcolor:"#4338ca" }}>New Expense</Button>
      <SettleUpButton/>
      </Box>
      
    </Box>
  )
}

export default BalanceAppBar;
