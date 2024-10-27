import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import React from 'react';
import SettleUpButton from '../SettleUpButton';
import AddExpenseDialog from '../Expense/Create Expense/AddExpenseButton';

const BalanceAppBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box 
      sx={{
        my: { xs: 2, sm: 4 }, 
        px: { xs: 2, sm: 0 },
        display: "flex", 
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: "stretch", sm: "center" },
        justifyContent: "space-between",
        gap: { xs: 2, sm: 0 } 
      }}
    >
      <Typography 
        variant='div'
        sx={{
          fontSize: { xs: 18, sm: 20 }, 
          textAlign: { xs: 'center', sm: 'left' } 
        }} 
      >
        Balances
      </Typography>
      <Box 
        sx={{
          display: "flex",
          justifyContent: { xs: "space-between", sm: "space-around" },
          gap: { xs: 2, sm: 2 }, 
          width: { xs: '100%', sm: 'auto' } 
        }}
      > 
        <AddExpenseDialog />
        <SettleUpButton />
      </Box>
    </Box>
  );
};

export default BalanceAppBar;