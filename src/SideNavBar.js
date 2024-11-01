import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import TimelineIcon from '@mui/icons-material/Timeline';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import { Link, useNavigate } from 'react-router-dom';
import appLogo from './assets/SplitShare Logo image.png'


const SideNavBar = ({ onClose }) => {
  const navigate = useNavigate("");

  const handleClickOnLogo = () => {
    navigate("/");
    if(onClose){
      onClose();
    } 
  }
  return (
    <>
      <Box
        component="img"
        src={appLogo}
        alt="Description of image"
        sx={{
          width: '75%',
          borderRadius: '8px',
          m:1.5,
          "&:hover":{
            cursor: "pointer"
          }
        }}

        onClick={handleClickOnLogo}
      />
      <Box sx={{ mx: "10px", width: '100%', maxWidth: 360 }}>
        <nav aria-label="main mailbox folders">
          <List >
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/" onClick={onClose}>
                <ListItemIcon>
                  <HomeOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Home" sx={{ ml: "-10px" }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/activities" onClick={onClose}>
                <ListItemIcon>
                  <TimelineIcon />
                </ListItemIcon>
                <ListItemText primary="Activity" sx={{ ml: "-10px" }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/friends" onClick={onClose}>
                <ListItemIcon>
                  <PersonOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Friends" sx={{ ml: "-10px" }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/groups" onClick={onClose}>
                <ListItemIcon>
                  <GroupsOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Groups" sx={{ ml: "-10px" }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/expenses" onClick={onClose}>
                <ListItemIcon>
                  <PaymentOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Expenses" sx={{ ml: "-10px" }} />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
        <Divider />
      </Box>
    </>
  )
}

export default SideNavBar;
