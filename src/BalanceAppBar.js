import { Box, Button, Typography } from '@mui/material';
import React from 'react';


const BalanceAppBar = () => {
  return (
    <Box container sx={{my:4,display:"flex", alignItems:"center",justifyContent:"space-between"}}>
      <Typography variant='div'sx={{fontSize: 20}} >Balances</Typography >
      <Box sx={{display:"flex",justifyContent:"space-around"}}> 
      <Button variant="contained" sx={{ textTransform: 'none' }}>New Expense</Button>
      <Button variant="contained"sx={{ textTransform: 'none',bgcolor:"#e0e7ff", color :"#4338ca",ml:2 }}>Settle Up</Button>
      </Box>
      
    </Box>
  )
}

export default BalanceAppBar;
