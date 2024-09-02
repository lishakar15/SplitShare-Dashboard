import React, { useState } from 'react';
import { Box, Paper, IconButton, InputBase, Divider, Avatar, Typography, useMediaQuery } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const MainSection = () => {
    const isSmallScreen = useMediaQuery('(max-width:1024px)');
    const [isSearchFocused,setIsSearchFocused]=  useState(false);
    const handleSearchFocus = ()=>{
        setIsSearchFocused(true);
    }
    const handleSearchBlur = ()=>{
        setIsSearchFocused(false);
    }

  return (
    <Box  container sx ={{m:"15px",display:"flex"}}>
        <Paper sx={{
            flex:1,
            display:"flex",
            border:isSearchFocused?"3px solid #e7eaf6":"none",
            borderRadius:"10px"}} onFocus={handleSearchFocus}
          onBlur={handleSearchBlur}>
            <IconButton type="button" sx={{ p: '10px'}} aria-label="search" >
                <SearchIcon />
            </IconButton>
            <InputBase sx={{flex:1}}
                placeholder="Search for a friend or a group "
                inputProps={{ 'aria-label': 'Search' }}> 
            </InputBase>   
        </Paper>
        <Divider  orientation="vertical" flexItem  sx={{mx:"15px"}}/>
        <Box sx={{display:"flex",width:"10%",alignItems:"center"}}>
        <Avatar
            sx={{ bgcolor: '#ebf4ff',color:"#2582f4" }}
            alt="Lishakar"
            src="/broken-image.jpg">
        </Avatar>
        {isSmallScreen ? null :(
            <>
                <Typography  sx={{
                    ml:1,
                    flexShrink:"0",
                    maxWidth: '100px'
                    }}>Lishakar
                </Typography>
                <ExpandMoreIcon sx={{color:"gray",ml:"2px"}}/>
            </>
            )}        
        </Box>
    </Box>
  )
}

export default MainSection;
