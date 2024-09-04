import React from 'react';
import { Box } from '@mui/material';
import SearchBar from './SearchBar';
import BalanceBoard from './BalanceBoard';
import BalanceAppBar from './BalanceAppBar';
import BalanceCard from './BalanceCard';

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
