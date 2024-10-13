import {
    Avatar,
    Box,
    Divider,
    ListItemIcon,
    Menu,
    MenuItem,
    Typography,
    useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import AvatarGenerator from "./AvatarGenerator";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useAtom, useSetAtom } from "jotai";
import { isUserLoggedInAtom, loggedInUserAtom } from "./atoms/UserAtom";
import { Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
    const isSmallScreen = useMediaQuery("(max-width:1024px)");
    const [loggedInUser] = useAtom(loggedInUserAtom);
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    const open = Boolean(anchorEl);

    const handleLogout = () => {
        localStorage.removeItem("userData");
        navigate("/login");
        window.location.reload();
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    "&:hover": {
                        cursor: "pointer",
                    },
                }}
                onClick={handleClick}
            >
                <AvatarGenerator userName={loggedInUser?.userName || "User"} />
                {!isSmallScreen && (
                    <>
                        <Typography
                            sx={{
                                ml: 1,
                                flexShrink: "0",
                                maxWidth: "100px",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {loggedInUser?.userName || "User"}
                        </Typography>
                        <ExpandMoreIcon sx={{ color: "gray", ml: "2px" }} />
                    </>
                )}
            </Box>

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        "&::before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <MenuItem onClick={handleClose}>
                    <Avatar /> Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
};

export default UserProfile;
