import React from "react";
import { TbArrowsSplit } from "react-icons/tb";
import {
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Box,
  Typography,
  useMediaQuery,
  Select,
  FormControl,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { GROUP_MEMBERS_DATA } from "../data/GroupMembersData";
import UserAvatarLabel from "../UserAvatarLabel";
import CreateUserSplits from "./SplitCards/CreateUserSplits";

const SplitAmountSection = ({group, totalAmount}) => {
  const currentLoggedInUser = {
    userId: 101,
    userName: "Lisha",
    splitAmount: totalAmount,
  };
  const [splitType, setSplitType] = useState("Equal");
  const [splitList, setSplitList] = useState([currentLoggedInUser]);
  const isSmallScreen = useMediaQuery("(max-width:1200px)");

  const handleSplitTypeChange = (newSplitType) => {
    setSplitType(newSplitType);
  };

  const handleAddSplit = (newUser) => {
    setSplitList([...splitList,newUser]);
  };

  return (
    <>
      <Grid xs={3} sx={{ pl: 2, display: "flex", alignItems: "center" }}>
        <Box sx={{ display: "flex", gap: 1 }}>
          <TbArrowsSplit size={25} color="red" />
          <Typography>Split Type</Typography>
        </Box>
      </Grid>
      <Grid xs={9} sx={{ pl: 2 }}>
        {isSmallScreen ? (
          <FormControl fullWidth>
            <Select
              value={splitType}
              onChange={(e) => handleSplitTypeChange(e.target.value)}
            >
              <MenuItem value="Equal">Equal</MenuItem>
              <MenuItem value="Percentage">Percentage</MenuItem>
              <MenuItem value="Adjustment">Adjustment</MenuItem>
              <MenuItem value="Manual">Manual</MenuItem>
            </Select>
          </FormControl>
        ) : (
          <Box sx={{ "& .MuiToggleButton-root": { textTransform: "none" } }}>
            <ToggleButtonGroup
              color="primary"
              value={splitType}
              exclusive
              onChange={(e) => handleSplitTypeChange(e.target.value)}
              aria-label="Platform"
            >
              <ToggleButton value="Equal">Equal</ToggleButton>
              <ToggleButton value="Percentage">Percentage</ToggleButton>
              <ToggleButton value="Adjustment">Adjustment</ToggleButton>
              <ToggleButton value="Manual">Manual</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        )}
      </Grid>
      {/**Need to add validations between total amount and Split amount */}
      <CreateUserSplits
        splitList={splitList}
        setSplitList={setSplitList}
        splitType={splitType}
        totalAmount={Number(totalAmount)}
      />
      <Grid container >
        
      </Grid>
      <Grid item md={6} xs={12}>
        <Typography>Group</Typography>
        <FormControl fullWidth>
          <Select value={group}>
            <MenuItem value="Cognizant Team">Cognizant Team</MenuItem>
            {/* Add other groups */}
          </Select>
        </FormControl>
      </Grid>
      <Grid item md={6} xs={12}>
        <Typography>Add Split</Typography>
        <FormControl fullWidth>
          <Select value={""} onChange={(e) => handleAddSplit(e.target.value)}>
            {GROUP_MEMBERS_DATA.map((user) => (
              <MenuItem key={user.userId} value={user}>
                <UserAvatarLabel userName={user.userName} size={"xs"} />
              </MenuItem>
            ))}
            {/* Add other groups */}
          </Select>
        </FormControl>
      </Grid>
    </>
  );
};
export default SplitAmountSection;
