import React from "react";
import { AvatarGroup, Box, Card, CardContent, Typography } from "@mui/material";
import AvatarGenerator from "./AvatarGenerator";
import { GROUP_DATA } from "./data/groupsData";
import { GROUP_OWE_SUMMARY } from "./data/GroupOwedData";
import GroupOweSummaryChip from "./Group/GroupOweSummaryChip";
import SettleUpButton from "./SettleUpButton";
import AddExpenseButton from "./Expense/AddExpenseButton";

const Expense = ({ group }) => {
  group = GROUP_DATA[2];

  return (
    <>
      <Card sx={{ my: 2, border: "1px solid #e5e7eb" }}>
        <>
          <CardContent
            sx={{
              px: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box container sx={{ display: "flex", justifyContent:"space-between", alignItems: "center", width:"100%"}}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <AvatarGenerator userName={group.groupName} size={"xl"} />
                <Box sx={{ ml: 1 }}>
                  <Typography sx={{ fontWeight: "bold", color: "#512DA8" }}>
                    {group.groupName}
                  </Typography>
                  <Typography>
                    {group.groupMembers.map((member, index) => (
                      <>
                        {member.userName}
                        {index < group.groupMembers.length - 1 ? ", " : ""}
                      </>
                    ))}
                  </Typography>
                  <Box sx={{ display: "flex" }}>
                    <AvatarGroup total={group.groupMembers.length} max={4}>
                      {group.groupMembers.map((member) => (
                        <AvatarGenerator
                          userName={member.userName}
                          size={"sm"}
                        />
                      ))}
                    </AvatarGroup>
                  </Box>
                  <GroupOweSummaryChip
                    currentGroupId={group.groupId}
                    groupOweList={GROUP_OWE_SUMMARY}
                  />
                </Box>
              </Box>
              <Box sx ={{display:"flex"}}>
                <AddExpenseButton/>
                <SettleUpButton/>
              </Box>
            </Box>

          </CardContent>
        </>
      </Card>
    </>
  );
};

export default Expense;
