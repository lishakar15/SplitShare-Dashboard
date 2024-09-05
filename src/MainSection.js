import React from 'react';
import { Box } from '@mui/material';
import SearchBar from './SearchBar';
import BalanceBoard from './Balance/BalanceBoard';
import BalanceAppBar from './Balance/BalanceAppBar';
import BalanceCard from './Balance/BalanceCard';

const MainSection = () => {
   
  return (
    <Box  container sx ={{ml:"15px"}}>
        <Box>
            <SearchBar/>
            <BalanceBoard/>
            <BalanceAppBar/>
            <BalanceCard/>
        </Box>
    </Box>

  )
}

export default MainSection;
