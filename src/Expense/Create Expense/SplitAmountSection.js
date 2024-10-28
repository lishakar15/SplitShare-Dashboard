import React, { useState, useEffect } from "react";
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
import UserAvatarLabel from "../../UserAvatarLabel";
import CreateUserSplits from "../SplitCards/CreateUserSplits";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { paidUsersAtom, participantShareListAtom, splitTypeAtom, totalExpenseAmountAtom } from "../../atoms/ExpenseAtom";
import { backendService } from "../../services/backendServices";
import { loggedInUserAtom } from "../../atoms/UserAtom";
import { currentGroupDataAtom } from "../../atoms/GroupAtom";

const SplitAmountSection = ({ groupData, setGroupId }) => {

  const [splitType, setSplitType] = useAtom(splitTypeAtom);
  const [splitList, setSplitList] = useAtom(participantShareListAtom);
  const [seletedGroupId, setSeletedGroupId] = useState(null);
  const [groupList, setGroupList] = useState([]);
  const setGroupData = useSetAtom(currentGroupDataAtom);
  const loggedInUser = useAtomValue(loggedInUserAtom);
  const totalAmount = useAtomValue(totalExpenseAmountAtom);
  const setParticipantShareList = useSetAtom(participantShareListAtom);
  const setPaidUsers = useSetAtom(paidUsersAtom);

  const defaultParticipant = {
    userId: loggedInUser.userId,
    userName: loggedInUser.userName,
    shareAmount: totalAmount,
  };

  const defaultPayer = {
    userId: loggedInUser.userId,
    userName: loggedInUser.userName,
    paidAmount: totalAmount,
  };


  useEffect(() => {
    const getAllGroups = async () => {
      try {
        const response = await backendService.getAllGroupsOfUser(loggedInUser.userId);
        if (response) {
          setGroupList(response);
          if (groupData) {
            setSeletedGroupId(groupData.groupId);
          }
        }
      } catch (err) {
        console.log("Error fetching Friends List");
      }
    }
    getAllGroups();
  }, [])


  const getGroupData = (groupId) => {

    const getGroupData = async () => {
      if (groupId && loggedInUser) {
        try {
          const response = await backendService.getGroupDataByGroupId(groupId, loggedInUser.userId);
          if (response) {
            setGroupData(response);
          }
        } catch (err) {
          console.log("Error occurred while fetching group data: " + err);
        }
      }
    };

    getGroupData();

  }

  const handleGroupChange = (newGroupId) => {
    setSeletedGroupId(newGroupId);
    setGroupId(newGroupId);
    setParticipantShareList([defaultParticipant]);
    setPaidUsers([defaultPayer]);
    getGroupData(newGroupId);
  }

  const isSmallScreen = useMediaQuery("(max-width:1200px)");

  const handleSplitTypeChange = (newSplitType) => {
    setSplitType(newSplitType);
  };

  const handleAddSplit = (newUser) => {
    const isExistingUser = splitList.some((user) => user.userId === newUser.userId);
    if (!isExistingUser) {
      setSplitList([...splitList, { ...newUser, shareAmount: 0 }]);
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
          <Select
            value={seletedGroupId}
            onChange={(e) => handleGroupChange(e.target.value)}
          >
            {groupList && groupList.map((group) => (
              <MenuItem key={group.groupId} value={group.groupId}>{group.groupName}</MenuItem>
            )
            )}
            {/* Add other groups */}
          </Select>
        </FormControl>
      </Grid>
      <Grid item md={6} xs={12}>
        <Typography>Add Split</Typography>
        <FormControl fullWidth>
          <Select value={""} onChange={(e) => handleAddSplit(e.target.value)}>
            {groupData && groupData.groupMembers && groupData.groupMembers.map((user) => (
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
