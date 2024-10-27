import { Box, Drawer } from "@mui/material";
import React from "react";
import SideNavBar from "./SideNavBar";
import FriendsNavBar from "./FriendsNavBar";
import GroupNavBar from "./GroupNavBar";
import { styled } from "@mui/system";

const SideNavDrawer = ({ isOpen, onClose }) => {
  // Custom Drawer styles to set z-index for both overlay and child content
  const CustomDrawer = styled(Drawer)(({ theme }) => ({
    "& .MuiDrawer-paper": {
      zIndex: 1300, // Set a higher z-index for the drawer content
    },
    "& .MuiBackdrop-root": {
      zIndex: 1200, // Set the overlay z-index here
    },
  }));

  return (
    <CustomDrawer
      anchor="left"
      open={isOpen}
      onClose={onClose}
      transitionDuration={{ enter: 500, exit: 200 }}
    >
      <Box sx={{ width: 250 }} role="presentation">
        {/* Optional: Apply z-index to child components if needed */}
        <Box sx={{ zIndex: 1300 }}>
          <SideNavBar onClose={onClose} />
        </Box>
        <Box sx={{ zIndex: 1300 }}>
          <GroupNavBar onClose={onClose} />
        </Box>
        <Box sx={{ zIndex: 1300 }}>
          <FriendsNavBar onClose={onClose} />
        </Box>
      </Box>
    </CustomDrawer>
  );
};

export default SideNavDrawer;
