import React, { useEffect, useState } from "react";
import {
  AvatarGroup,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AvatarGenerator from "../AvatarGenerator";
import GroupOweSummaryChip from "../Group/GroupOweSummaryChip";
import SettleUpButton from "../SettleUpButton";
import AddExpenseButton from "./Create Expense/AddExpenseButton";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { currentGroupDataAtom } from "../atoms/GroupAtom";
import { backendService } from "../services/backendServices";
import { loggedInUserAtom } from "../atoms/UserAtom";
import SettingsIcon from '@mui/icons-material/Settings';
import { Settings } from "@mui/icons-material";
import CreateGroupDialog from "../CreateGroupDialog";
import { refetchTriggerAtom } from "../atoms/Atoms";

const ExpenseGroupInfoCard = ({ groupData }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const setGroupData = useSetAtom(currentGroupDataAtom);
  const loggedInUser = useAtomValue(loggedInUserAtom);
  const [balanceSummaryList, setBalanceSummaryList] = useState(null);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setGroupData(groupData);
    fetchBalanceSummary();
  }, [groupData])

  const fetchBalanceSummary = async () => {
    try {
      const response = await backendService.getGroupBalanceSummary(groupData.groupId, loggedInUser.userId);
      if (response) {
        setBalanceSummaryList(response);
      }
    }
    catch (err) {
      console.log("Error fecthing user balance summary in group " + err);
    }
  }

  return groupData &&
    (
      <>
      <Card sx={{ my: 2, border: "1px solid #e5e7eb" }} >
        <CardContent
          sx={{
            px: 3,
            display: "flex",
            flexDirection: isSmallScreen ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isSmallScreen ? "stretch" : "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginBottom: isSmallScreen ? 2 : 0,
            }}
          >
            <AvatarGenerator userName={groupData.groupName} size={"xl"} />
            <Box sx={{ ml: 1 }}>
              <Typography sx={{ fontWeight: "bold", color: "#512DA8", display: "flex", alignItems: "center", gap: 1 }}>
                {groupData.groupName}
                <Button
                  variant="outlined"
                  size="small" 
                  sx={{ borderRadius: 4, fontSize: '0.875rem' }}
                  onClick={handleClickOpen}
                >
                  Edit
                </Button>

              </Typography>
              <Typography>
                {groupData.groupMembers.map((member, index) => (
                  <React.Fragment key={member.userId}>
                    {member.userName}
                    {index < groupData.groupMembers.length - 1 ? ", " : ""}
                  </React.Fragment>
                ))}
              </Typography>
              <Box sx={{ display: "flex" }}>
                <AvatarGroup total={groupData.groupMembers.length} max={4}>
                  {groupData.groupMembers.map((member) => (
                    <AvatarGenerator
                      key={member.userId}
                      userName={member.userName}
                      size={"sm"}
                    />
                  ))}
                </AvatarGroup>
              </Box>
              {balanceSummaryList &&
                <GroupOweSummaryChip
                  currentGroupId={groupData.groupId}
                  groupOweList={balanceSummaryList}
                />
              }

            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              width: isSmallScreen ? "100%" : "auto",
            }}
          >
            <AddExpenseButton />
            <SettleUpButton />
          </Box>
        </CardContent>
      </Card >
      {open && <CreateGroupDialog open={open} onClose={handleClose} groupId={groupData.groupId} isModifyReq={true}/>}
      </>
    )
}

export default ExpenseGroupInfoCard;
