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
const ExpenseTabs = () => {
  const [value, setValue] = useState("balances");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList
          onChange={handleChange}
          aria-label="lab API tabs example"
          sx={{
            "& .MuiTab-root": {
              textTransform: "none",
            },
          }}
        >
          <Tab
            icon={<AttachMoneyIcon />}
            label="Balances"
            value="balances"
            iconPosition="start"
          />
          <Tab
            icon={<TimelineIcon />}
            label="Activity"
            value="activity"
            iconPosition="start"
          />
          <Tab
            icon={<PeopleTwoToneIcon />}
            label="Members"
            value="members"
            iconPosition="start"
          />
        </TabList>
      </Box>
      <TabPanel value="balances">Balance Tab</TabPanel>
      <TabPanel value="activity">Activity Tab</TabPanel>
      <TabPanel value="members">Members Tab</TabPanel>
    </TabContext>
  );
};

export default ExpenseTabs;
