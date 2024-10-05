import React, { useState } from 'react';
import { Box, Paper, IconButton, InputBase, Divider} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import UserProfile from './UserProfile';

const SearchBar = () => {

    
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const handleSearchFocus = () => {
        setIsSearchFocused(true);
    }
    const handleSearchBlur = () => {
        setIsSearchFocused(false);
    }

    return (

        <Box container sx={{ display: "flex" }}>
            <Paper sx={{
                flex: 1,
                display: "flex",
                border: isSearchFocused ? "3px solid #e7eaf6" : "none",
                borderRadius: "10px"
            }} onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}>
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search" >
                    <SearchIcon />
                </IconButton>
                <InputBase sx={{ flex: 1 }}
                    placeholder="Search for a friend or a group "
                    inputProps={{ 'aria-label': 'Search' }}>
                </InputBase>
            </Paper>
            <Divider orientation="vertical" flexItem sx={{ mx: "15px" }} />
            <UserProfile/>
        </Box>
    )
}

export default SearchBar
