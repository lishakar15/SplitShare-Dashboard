import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const FriendsBar = () => {
    const handleAddFriend = () => { };
    return (
        <Card sx={{ my: 2, border: "1px solid #e5e7eb" }}>
            <CardContent
                sx={{
                    mx: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography variant="h5" sx={{ color: "black" }}>
                    Friends
                </Typography>
                <Button
                    variant="contained"
                    onClick={handleAddFriend}
                    endIcon={<PersonAddIcon />}
                    sx={{
                        textTransform: "none",
                        bgcolor: "#4338ca",
                        ml: 2,
                    }}
                >
                    Add Friend
                </Button>

            </CardContent>
        </Card>
    );
};

export default FriendsBar;
