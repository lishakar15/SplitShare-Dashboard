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
            <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              <nav aria-label="main mailbox folders">
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <HomeOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Home" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <TimelineIcon />
                      </ListItemIcon>
                      <ListItemText primary="Activity" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <PersonOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Friends" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <GroupsOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Groups" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <PaymentOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Expenses" />
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
