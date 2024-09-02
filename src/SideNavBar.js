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


const SideNavBar = () => {
      return (
        <>
            <Box sx={{ mx:"10px", width: '100%', maxWidth: 360}}>
              <nav aria-label="main mailbox folders">
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <HomeOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Home" sx ={{ml:"-10px"}}/>
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <TimelineIcon />
                      </ListItemIcon>
                      <ListItemText primary="Activity" sx ={{ml:"-10px"}}/>
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <PersonOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Friends" sx ={{ml:"-10px"}}/>
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <GroupsOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Groups" sx ={{ml:"-10px"}}/>
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <PaymentOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Expenses" sx ={{ml:"-10px"}}/>
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
