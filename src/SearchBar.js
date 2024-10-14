import React, { useState } from 'react';
import { Box, Paper, IconButton, InputBase, Divider, Drawer, useMediaQuery } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import UserProfile from './UserProfile';
import SideNavDrawer from './SideNavDrawer';

const SearchBar = () => {
    const isSmallScreen = useMediaQuery("(max-width:1200px)");
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [isSideNavOpen, setIsSideNavOpen] = useState(false);

    const handleSearchFocus = () => {
        setIsSearchFocused(true);
    };

    const handleSearchBlur = () => {
        setIsSearchFocused(false);
    };

    const handleMenuClick = () => {
        setIsSideNavOpen(true);
    };

    const handleSideNavClose = () => {
        setIsSideNavOpen(false);
    };

    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>

            {isSmallScreen && (
                <IconButton
                    onClick={handleMenuClick}
                    sx={{ mr: 1 }}
                    aria-label="open menu"
                >
                    <MenuIcon sx={{ fontSize: 40 }} />
                </IconButton>
            )
            }

            <Paper sx={{
                flex: 1,
                display: "flex",
                border: isSearchFocused ? "3px solid #e7eaf6" : "none",
                borderRadius: "10px",
            }} onFocus={handleSearchFocus} onBlur={handleSearchBlur}>
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
                <InputBase
                    sx={{ flex: 1 }}
                    placeholder="Search for a friend or a group"
                    inputProps={{ 'aria-label': 'Search' }}
                />
            </Paper>

            <Divider orientation="vertical" flexItem sx={{ mx: "15px" }} />
            <UserProfile />

            <SideNavDrawer isOpen={isSideNavOpen} onClose={handleSideNavClose} />
        </Box>
    );
};

export default SearchBar;