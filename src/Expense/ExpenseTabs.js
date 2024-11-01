import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TimelineIcon from "@mui/icons-material/Timeline";
import PeopleTwoToneIcon from "@mui/icons-material/PeopleTwoTone";
import PaymentIcon from '@mui/icons-material/Payment';
import { useTheme, useMediaQuery } from "@mui/material";
import ExpenseList from "./ExpenseList";
import SettlementList from "../Payment/SettlementList";
import GroupMembers from "../GroupMembers";
import ActivityList from "../ActivityList";

const ExpenseTabs = ({ groupId, refreshTrigger }) => {
  const [value, setValue] = useState("expenses");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabProps = {
    sx: {
      minWidth: isMobile ? 'auto' : 'inherit',
      padding: isMobile ? '6px 8px' : '12px 16px',
      '& .MuiTab-iconWrapper': {
        marginRight: isMobile ? '4px' : '8px',
        '& svg': {
          fontSize: isMobile ? '1.2rem' : '1.5rem',
        },
      },
    },
  };

  return (
    <TabContext value={value}>
      <Box 
        sx={{ 
          borderBottom: 1, 
          borderColor: "divider",
          width: '100%',
          overflowX: 'auto',
          '&::-webkit-scrollbar': {
            display: 'none'
          },
          msOverflowStyle: 'none',
          scrollbarWidth: 'none'
        }}
      >
        <TabList
          onChange={handleChange}
          aria-label="expense tabs"
          variant={isMobile ? "scrollable" : "standard"}
          scrollButtons={isMobile ? "auto" : false}
          allowScrollButtonsMobile
          sx={{
            "& .MuiTab-root": {
              textTransform: "none",
              whiteSpace: 'nowrap',
            },
            "& .MuiTabs-flexContainer": {
              gap: isMobile ? 1 : 2,
            },
            minHeight: isMobile ? 40 : 48,
          }}
        >
          <Tab
            icon={<PaymentIcon />}
            label="Expenses"
            value="expenses"
            iconPosition="start"
            {...tabProps}
          />
          <Tab
            icon={<AttachMoneyIcon />}
            label="Settlements"
            value="settlements"
            iconPosition="start"
            {...tabProps}
          />
          <Tab
            icon={<TimelineIcon />}
            label="Activity"
            value="activity"
            iconPosition="start"
            {...tabProps}
          />
          <Tab
            icon={<PeopleTwoToneIcon />}
            label="Members"
            value="members"
            iconPosition="start"
            {...tabProps}
          />
        </TabList>
      </Box>

      <TabPanel 
        value="expenses" 
        sx={{ 
          p: 0, 
          mt: isMobile ? 1 : 2,
          '& .MuiTabPanel-root': {
            padding: isMobile ? 1 : 2
          }
        }}
      >
        <ExpenseList groupId={groupId}/>
      </TabPanel>
      
      <TabPanel 
        value="settlements" 
        sx={{ 
          p: 0, 
          mt: isMobile ? 1 : 2 
        }}
      >
        <SettlementList groupId={groupId}/>
      </TabPanel>
      
      <TabPanel 
        value="activity" 
        sx={{ 
          p: 0, 
          mt: isMobile ? 1 : 2 
        }}
      >
        <ActivityList groupId={groupId}/>
      </TabPanel>
      
      <TabPanel 
        value="members" 
        sx={{ 
          p: 0, 
          mt: isMobile ? 1 : 2 
        }}
      >
        <GroupMembers groupId={groupId}/>
      </TabPanel>
    </TabContext>
  );
};

export default ExpenseTabs;