import React, { useState } from "react";
import { GROUP_MEMBERS_DATA } from "./data/GroupMembersData";
import UserAvatarLabel from "./UserAvatarLabel";
import { Box, Grid } from "@mui/material";

const GroupMembers = ({ groupId }) => {
  const [groupMembers, setGroupMembers] = useState(null);

  return (
    <>
      <Grid container spacing={2}>
        {GROUP_MEMBERS_DATA.map((member) => (
          <Grid item xs={6} sm={4}>
            <Box
              sx={{
                p: 1,
                border: "1px solid lightgray",
                borderRadius: 3,
                bgcolor: "#f9fafb",
                my: 1,
              }}
            >
              <UserAvatarLabel userName={member.userName} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default GroupMembers;
