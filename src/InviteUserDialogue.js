import React, { useState } from 'react';
import {
    Popover,
    TextField,
    Button,
    IconButton,
    Typography,
    Box,
    InputAdornment,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import CustomizedSnackbars from './utilities/CustomSnackBar';
import { backendService } from './services/backendServices';
import { loggedInUserAtom } from './atoms/UserAtom';
import { useAtomValue } from 'jotai';

const InviteUserPopover = ({ anchorEl, onClose }) => {
    const [email, setEmail] = useState('');
    // Snackbar state
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSuccess, setSnackbarSuccess] = useState(false);
    const [copyButtonText, setCopyButtonText] = useState('Copy invite link');
    const loggedInUser = useAtomValue(loggedInUserAtom);

    const open = Boolean(anchorEl);
    const id = open ? 'invite-popover' : undefined;

    const handleInvite = async () => {
        if (email !== "") {
            try {
                const inviteUrl = await getInviteUrl();
                console.log("url link "+inviteUrl)
                const userInvite = {
                    email: email,
                    invitationLink: inviteUrl
                }
                const isInvitationSent = backendService.sentInvitation(userInvite);
                if (isInvitationSent) {
                    setSnackbarMessage("Invitation Sent Successfully");
                    setSnackbarSuccess(true);
                    setSnackbarOpen(true);
                    setEmail("");
                }
                else {
                    setSnackbarMessage("Please enter a valid email.");
                    setSnackbarSuccess(false);
                    setSnackbarOpen(true);
                }
            }
            catch (err) {
                console.log("Error sending invitation " + err);
            }
            onClose();
        };
    }
    const handleCopyLink = async () => {
        setCopyButtonText("Creating invite link...");
        const inviteLink = await getInviteUrl();

        if (inviteLink !== null && inviteLink !== "") {
            navigator.clipboard.writeText(inviteLink)
                .then(() => {
                    setSnackbarMessage("Invite link copied to clipboard!");
                    setSnackbarSuccess(true);
                    setSnackbarOpen(true);
                })
                .catch(err => {
                    console.log(err)
                    setSnackbarMessage("Failed to copy the invite link");
                    setSnackbarSuccess(false);
                    setSnackbarOpen(true);
                })
                .finally(() => {
                    setCopyButtonText("Copy invite link");
                });
        }
    };

    const getInviteUrl = async () => {
        const baseUrl = window.location.origin;
        const inviteParams = {
            inviterId: loggedInUser.userId,
            baseUrl: baseUrl
        }
        return await backendService.createInviteLink(inviteParams);
    }
    return (
        <>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={onClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <Box p={2} sx={{ width: 300 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>Invite or add friends</Typography>
                        <IconButton onClick={onClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                        <Typography sx={{ fontWeight: "bold" }}>New friends</Typography>
                        <Button
                            variant="contained"
                            onClick={handleCopyLink}
                            sx={{ textTransform: 'none', bgcolor: "#e0e7ff", color: "#4338ca", borderRadius: 5 }}
                        >
                            {copyButtonText}
                        </Button>
                    </Box>
                    <Typography>Invitation link will be sent to the provided email ID</Typography>
                    <TextField
                        variant="outlined"
                        fullWidth
                        type='email'
                        margin="normal"
                        placeholder='example@gmail.com'
                        value={email}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailIcon />
                                </InputAdornment>
                            ),
                        }}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        onClick={handleInvite}
                        fullWidth
                        sx={{ color: "#4338ca", bgcolor: "#4338ca", mt: 2 }}
                    >
                        <Typography sx={{ textTransform: "none", color: "white", fontWeight: "bold" }}>Invite Friend</Typography>
                    </Button>
                </Box>
            </Popover>
            <CustomizedSnackbars
                open={snackbarOpen}
                setOpen={setSnackbarOpen}
                message={snackbarMessage}
                isSuccess={snackbarSuccess}
            />
        </>
    );
};


export default InviteUserPopover;
