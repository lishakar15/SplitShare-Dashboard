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
import { GROUP_MEMBERS_DATA } from "../data/GroupMembersData";
import UserAvatarLabel from "../UserAvatarLabel";
import CreateUserSplits from "./SplitCards/CreateUserSplits";
import { useAtom } from "jotai";
import { participantShareListAtom, splitTypeAtom } from "../atoms/ExpenseAtom";

const SplitAmountSection = ({group}) => {

  const [splitType, setSplitType] = useAtom(splitTypeAtom);
  const [splitList, setSplitList] = useAtom(participantShareListAtom);

  const isSmallScreen = useMediaQuery("(max-width:1200px)");

  const handleSplitTypeChange = (newSplitType) => {
    setSplitType(newSplitType);
  };

  const handleAddSplit = (newUser) => {
    const isExistingUser = splitList.some((user) => user.userId === newUser.userId);
    if (!isExistingUser) {
      setSplitList([...splitList, {...newUser,shareAmount:0}]);
    }
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
              <MenuItem value="EQUAL">Equal</MenuItem>
              <MenuItem value="PERCENTAGE">Percentage</MenuItem>
              <MenuItem value="SHARES">Shares</MenuItem>
              <MenuItem value="ADJUSTMENT">Adjustment</MenuItem>
              <MenuItem value="MANUAL">Manual</MenuItem>
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
              <ToggleButton value="EQUAL">Equal</ToggleButton>
              <ToggleButton value="PERCENTAGE">Percentage</ToggleButton>
              <ToggleButton value="SHARES">Shares</ToggleButton>
              <ToggleButton value="ADJUSTMENT">Adjustment</ToggleButton>
              <ToggleButton value="MANUAL">Manual</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        )}
      </Grid>
      <CreateUserSplits
        splitType={splitType}
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
          </Select>
        </FormControl>
      </Grid>
    </>
  );
};
export default SplitAmountSection;
