import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import InviteUserPopover from './InviteUserDialogue';
import UserAvatarLabel from './UserAvatarLabel';
import { EastOutlined } from '@mui/icons-material';
import { backendService } from './services/backendServices';
import { useAtomValue } from 'jotai';
import { loggedInUserAtom } from './atoms/UserAtom';
const FriendsNavBar = ({ onClose }) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const loggedInUser = useAtomValue(loggedInUserAtom);
    const [friendsList, setFriendsList] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const getFriends = async () => {
            try {
                const response = await backendService.getAllFriendsInfoByUserId(loggedInUser.userId);
                if (response) {
                    setFriendsList(response.splice(0, 4)); //Show 4 Friends max
                }
            } catch (err) {
                console.log("Error fetching Friends List");
            }
        }
        getFriends();
    }, [loggedInUser]);


    return (

        <Box sx={{ mx: 1, my: 2, width: '100%', maxWidth: 360 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ color: "gray", whiteSpace: "nowrap", ml: "20px" }}>Your Friends</Typography>
                <Button
                    variant="contained"
                    onClick={handleClick}
                    endIcon={<PersonAddIcon />}
                    sx={{
                        textTransform: "none",
                        bgcolor: "#4338ca",
                        mx: 2,
                        whiteSpace: "nowrap"
                    }}
                >
                    Invite
                </Button>
            </Box>

            <nav aria-label="friends list">
                <List>
                    {friendsList && friendsList.length > 0 ?
                        (
                            <>
                                {friendsList.map((friend) => (
                                    <ListItem key={friend.userid} disablePadding>
                                        <ListItemButton onClick={onClose} component={Link} to={`/friends`}>
                                            <UserAvatarLabel userName={friend.firstName + " " + friend.lastName} showSingleChar={true} />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                                <ListItem disablePadding>
                                    <ListItemButton onClick={onClose} component={Link} to={`/friends`}>
                                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }} gap={1}>
                                            <Typography sx={{ ml: "10px" }}>See all friends </Typography>
                                            <EastOutlined />
                                        </Box>
                                    </ListItemButton>
                                </ListItem>
                            </>
                        )
                        :
                        (
                            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: 150 }}>
                                <Typography>You have no Friends😏</Typography>
                            </Box>
                            
                        )
                    }
                </List>
            </nav>
            <Divider />
            <InviteUserPopover anchorEl={anchorEl} onClose={handleClose} />
        </Box>
    )
}

export default FriendsNavBar;
