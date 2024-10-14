import { Box, Drawer } from '@mui/material';
import React from 'react';
import SideNavBar from './SideNavBar';

const SideNavDrawer = ({ isOpen, onClose }) => {
    return (
        <Drawer
            anchor="left"
            open={isOpen}
            onClose={onClose}
            transitionDuration={{ enter: 500, exit: 200 }}
        >
            <Box sx={{ width: 250 }} role="presentation">
                <SideNavBar onClose={onClose} />
            </Box>
        </Drawer>
    );
};

export default SideNavDrawer;
