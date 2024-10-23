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
import { useAtom, useAtomValue } from 'jotai';
import { loggedInUserAtom } from './atoms/UserAtom';
import CreateGroupDialog from './CreateGroupDialog';
import { refetchTriggerAtom } from './atoms/Atoms';

const GroupNavBar = ({ onClose }) => {

    const loggedInUser = useAtomValue(loggedInUserAtom);
    const [groupList, setGroupList] = useState(null);
    const [open, setOpen] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useAtom(refetchTriggerAtom);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const getGroups = async () => {
            try {
                const response = await backendService.getAllGroupsOfUser(loggedInUser.userId);
                if (response) {
                    setGroupList(response.splice(0, 4)); //Show 4 Groups max
                }
            } catch (err) {
                console.log("Error fetching Friends List");
            }
        }
        getGroups();
    }, [loggedInUser, refreshTrigger]);

    return (
        <Box sx={{ mx: 1, my: 2, width: '100%', maxWidth: 360 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ color: "gray", whiteSpace: "nowrap", ml: "20px" }}>Your Groups</Typography>
                <Button
                    variant="contained"
                    onClick={handleClickOpen}
                    sx={{
                        textTransform: "none",
                        bgcolor: "#4338ca",
                        mx: 2,
                        whiteSpace: "nowrap"
                    }}
                >
                    + New Group
                </Button>
            </Box>

            <nav aria-label="group list">
                <List>
                    {groupList && groupList.length > 0 ? (
                        <>
                            {groupList.map((group) => (
                                <ListItem key={group.groupId} disablePadding>
                                    <ListItemButton onClick={onClose} component={Link} to={`/expenses/group/${group.groupId}`}>
                                        <UserAvatarLabel userName={group.groupName} showSingleChar={true} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                            <ListItem disablePadding>
                                <ListItemButton onClick={onClose} component={Link} to={`/groups`}>
                                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }} gap={1}>
                                        <Typography sx={{ ml: "10px" }}>See all groups</Typography>
                                        <EastOutlined />
                                    </Box>
                                </ListItemButton>
                            </ListItem>
                        </>
                    ) : (
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 150 }}>
                            <Typography>You are not part of any Group</Typography>
                        </Box>
                    )}
                </List>
            </nav>
            <Divider />
            {open && <CreateGroupDialog open={open} onClose={handleClose} />}
        </Box>
    );
};

export default GroupNavBar;
