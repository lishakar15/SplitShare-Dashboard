import React, { useState } from 'react';
import { Box, Paper, IconButton, Divider, useMediaQuery, Autocomplete, TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import UserProfile from './UserProfile';
import SideNavDrawer from './SideNavDrawer';
import UserAvatarLabel from './UserAvatarLabel';
import { Link } from 'react-router-dom';

const SearchBar = () => {
    const isSmallScreen = useMediaQuery("(max-width:1200px)");
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [isSideNavOpen, setIsSideNavOpen] = useState(false);
    const [searchOptions, setSearchOptions] = useState([
        { groupId: 1, groupName: "Awesome Group" },
        { groupId: 4, groupName: "Cognizant Group" },
        { groupId: 5, groupName: "Test Group" },
    ]);


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

    const handleOptionSelect = (event, newValue) => {
        //
    };

    return (
        <Box sx={{ display: "flex", alignItems: "center", borderRadius: "20px" }}>

            {isSmallScreen && (
                <IconButton
                    onClick={handleMenuClick}
                    sx={{ mr: 1 }}
                    aria-label="open menu"
                >
                    <MenuIcon sx={{ fontSize: 40 }} />
                </IconButton>
            )}

            <Paper
                sx={{
                    flex: 1,
                    display: "flex",
                    border: isSearchFocused ? "3px solid #e7eaf6" : "none",
                    borderRadius: "20px",
                    overflow: 'hidden',
                }}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
            >
                <Autocomplete
                    freeSolo
                    disableClearable
                    onChange={handleOptionSelect}
                    getOptionLabel={(option) => option.groupName || ''}
                    options={searchOptions}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder="Search for a friend or a group"
                            InputProps={{
                                ...params.InputProps,
                                startAdornment: (
                                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                        <SearchIcon />
                                    </IconButton>
                                ),
                                'aria-label': 'search',
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '20px',
                                },
                            }}
                        />
                    )}
                    renderOption={(props, option) => (
                        <li {...props}>
                            <Button >
                            <Link
                                style={{ textDecoration: "none" }}
                                to={`/expenses/group/${option.groupId}`}
                                onClick={(event) => event.stopPropagation()}
                            >
                                <UserAvatarLabel userName={option.groupName} />
                            </Link>

                            </Button>                            
                        </li>
                    )}
                    sx={{ flex: 1 }}
                />
            </Paper>

            <Divider orientation="vertical" flexItem sx={{ mx: "15px" }} />
            <UserProfile />

            <SideNavDrawer isOpen={isSideNavOpen} onClose={handleSideNavClose} />
        </Box>
    );
};

export default SearchBar;
