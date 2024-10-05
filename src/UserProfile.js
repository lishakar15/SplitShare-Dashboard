import { Box, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import AvatarGenerator from './AvatarGenerator';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAtomValue } from 'jotai';
import { loggedInUserAtom } from './atoms/UserAtom';

const UserProfile = () => {
    const isSmallScreen = useMediaQuery('(max-width:1024px)');
    const loggedInUser = useAtomValue(loggedInUserAtom);
    
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
                <AvatarGenerator userName={loggedInUser.userName} />
                {isSmallScreen ? null : (
                    <>
                        <Typography sx={{
                            ml: 1,
                            flexShrink: "0",
                            maxWidth: '100px'
                        }}>{loggedInUser.userName}
                        </Typography>
                        <ExpandMoreIcon sx={{ color: "gray", ml: "2px" }} />
                    </>
                )}
            </Box>
    
  )
}

export default UserProfile
