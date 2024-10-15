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

const InviteUserPopover = ({ anchorEl, onClose }) => {
    const [email, setEmail] = useState('');
    // Snackbar state
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSuccess, setSnackbarSuccess] = useState(false);

    const open = Boolean(anchorEl);
    const id = open ? 'invite-popover' : undefined;

    const handleInvite =  () => {
        if (email !== "") {
            try {
                const userInvite = {
                    email: email,
                    invitationLink: getInviteUrl()
                }
                const isInvitationSent =  backendService.sentInvitation(userInvite);
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
        const handleCopyLink = () => {
            const inviteLink = getInviteUrl()
            navigator.clipboard.writeText(inviteLink);
        };

        const getInviteUrl = () => {
            const baseUrl = window.location.origin;
            return `${baseUrl}/user/register-user`;
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
                            <Typography variant="h6">Invite or add friends</Typography>
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
                                Copy invite link
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
