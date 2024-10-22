import React, { useEffect, useState } from 'react';
import { Box, Paper, IconButton, Divider, useMediaQuery, Autocomplete, TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import UserProfile from './UserProfile';
import SideNavDrawer from './SideNavDrawer';
import UserAvatarLabel from './UserAvatarLabel';
import { Link } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { loggedInUserAtom } from './atoms/UserAtom';
import { backendService } from './services/backendServices';

const SearchBar = () => {
    const isSmallScreen = useMediaQuery("(max-width:1200px)");
    const [isSideNavOpen, setIsSideNavOpen] = useState(false);
    const loggedInUser = useAtomValue(loggedInUserAtom);
    const [searchOptions, setSearchOptions] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {

        const getGroupsList = async () => {
            try {
                const response = await backendService.getAllGroupsOfUser(loggedInUser.userId);
                if (response) {
                    setSearchOptions(response);
                }
                else{
                    setSearchOptions([]);
                }
            }
            catch (err) {
                console.log("Error constructing Group options in SearchBar " + err);
            }
        }
        getGroupsList();
    }, [loggedInUser]);

    const handleMenuClick = () => {
        setIsSideNavOpen(true);
    };

    const handleSideNavClose = () => {
        setIsSideNavOpen(false);
    };

    const handleOptionSelect = (event, newValue) => {
        //Do nothing
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
                    borderRadius: "20px",
                    overflow: 'hidden',
                }}
            >
                <Autocomplete
                    freeSolo
                    disableClearable
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
                    onChange={handleOptionSelect}
                    getOptionLabel={(option) => option.groupName || ''}
                    options={searchOptions}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder="Search for a group"
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
                        <li {...props} style={{ padding: 0 }}>
                            <Link
                                to={`/expenses/group/${option.groupId}`}
                                style={{
                                    display: 'flex',
                                    textDecoration: 'none',
                                    width: '100%',
                                    padding: '10px',
                                    alignItems: 'center',
                                }}
                            >
                                <UserAvatarLabel userName={option.groupName} />
                            </Link>
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
