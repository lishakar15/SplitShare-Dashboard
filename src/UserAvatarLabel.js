import { Box, Typography } from '@mui/material'
import React from 'react'
import AvatarGenerator from './AvatarGenerator'

const UserAvatarLabel = ({userName,size, showSingleChar}) => {
  return (
    <Box sx={{display:"flex", alignItems:"center",gap:1}}>
        <AvatarGenerator userName={userName} size={size} showSingleChar={showSingleChar}/>
        <Typography sx={{whiteSpace:"nowrap"}}>{userName}</Typography>
    </Box>
  )
}

export default UserAvatarLabel
