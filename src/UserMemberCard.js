import React from "react";
import {
    Box,
    Card,
    CardContent,
    Divider,
    FormControlLabel,
    Radio,
} from "@mui/material";
import UserAvatarLabel from "./UserAvatarLabel";
import { GoTrash } from "react-icons/go";

const UserMemberCard = ({ userId, userName, handleUserCardDelete, showRadioBtn }) => {

    return (
        <Card variant="outlined" sx={{ borderRadius: 3, mb: 1, width: '100%' }}>
            <CardContent
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <UserAvatarLabel userName={userName} size={"sm"} />
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    {showRadioBtn ?
                        (
                            <>
                                <Divider orientation="vertical" sx={{ height: 28, mx: 2 }} />
                                <FormControlLabel
                                    control={
                                        <Radio
                                            defaultChecked
                                            sx={{ color: '#4A3AFF', '&.Mui-checked': { color: '#4A3AFF' }}}
                                        />
                                    }
                                    sx={{ color: '#424242' }}
                                />
                            </>

                        ) :
                        (
                            <>
                                <Divider orientation="vertical" sx={{ height: 28, mx: 2 }} />
                                <GoTrash
                                style={{ fontSize: "20px", cursor: "pointer", margin: "0 8px" }}
                                onClick={() => handleUserCardDelete(userId)}
                                value={userName}
                            />
                            </>
                           
                        )
                    }

                </Box>
            </CardContent>
        </Card>
    )
};

export default UserMemberCard;
