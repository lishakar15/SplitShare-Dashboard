import React from 'react';
import { Box } from '@mui/material';
import SearchBar from './SearchBar';
import BalanceBoard from './BalanceBoard';
import BalanceAppBar from './BalanceAppBar';

const MainSection = () => {
   
  return (
    <Box  container sx ={{ml:"15px"}}>
        <SearchBar/>
        <BalanceBoard/>
    </Box>

  )
}

export default MainSection;
