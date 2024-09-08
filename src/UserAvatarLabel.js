import { Box, Typography } from '@mui/material'
import React from 'react'
import AvatarGenerator from './AvatarGenerator'

const UserAvatarLabel = ({userName,size}) => {
  return (
    <Box sx={{display:"flex", alignItems:"center",gap:1}}>
        <AvatarGenerator userName={userName} size={size}/>
        <Typography sx={{whiteSpace:"nowrap"}}>{userName}</Typography>
    </Box>
  )
}

export default UserAvatarLabel
