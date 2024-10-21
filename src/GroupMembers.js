import React, { useEffect, useState } from "react";
import { Box, FormControlLabel, Grid, Radio, Typography, useMediaQuery, useTheme } from "@mui/material";
import AvatarGenerator from "./AvatarGenerator";
import EmailIcon from '@mui/icons-material/Email';
import { backendService } from "./services/backendServices";
import { useAtomValue } from "jotai";
import { loggedInUserAtom } from "./atoms/UserAtom";

const GroupMembers = ({ groupId }) => {
  const [groupMembers, setGroupMembers] = useState(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const loggedInUser = useAtomValue(loggedInUserAtom);

  useEffect(() => {
    const getGroupMembers = async () => {
      try {
        let response = [];
        if(groupId)
        {
          response = await backendService.getAllGroupMembersByGroupId(groupId);
        }
        else {
          response = await backendService.getAllFriendsInfoByUserId(loggedInUser.userId);
        }
        if (response !== null) {
          setGroupMembers(response);
        }
      } catch (err) {
        console.log("Error fetching Group Members data");
      }
    }
    getGroupMembers();
  }, [groupId,loggedInUser]);

  return (
    <Grid container spacing={2}>
      {groupMembers && groupMembers.map((member) => (
        <Grid item xs={12} sm={12} md={6} xl={4} key={member.emailId}>
          <Box
            sx={{
              p: { xs: 1, sm: 2 },
              border: "1px solid lightgray",
              borderRadius: 3,
              bgcolor: "#f9fafb",
              display: "flex",
              alignItems: {  sm: 'flex-start' },
              gap: { xs: 2, sm: 1 },
              flexGrow: 1
            }}
          >
            <AvatarGenerator userName={member.firstName + " " + member.lastName} size={isSmallScreen ? "sm" : "md"} />
            <Box sx={{
              display: "flex",
              flex: 1,
              justifyContent: "space-between",
              alignItems: 'flex-start',
              width: '100%',
              textAlign: {  sm: 'left' }
            }}>
              <Box>
                <Typography sx={{ fontWeight: "bold" }}>{member.firstName + " " + member.lastName}</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: {  sm: 'flex-start' } }}>
                  <EmailIcon sx={{ color: "grey" }} />
                  <Typography sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>{member.emailId}</Typography>
                </Box>
              </Box>
              <Box>
                <FormControlLabel
                  control={
                    <Radio
                      defaultChecked
                      sx={{ color: '#4A3AFF', '&.Mui-checked': { color: '#4A3AFF' } }}
                    />
                  }
                  label="Active"
                  sx={{ margin: 0, color: '#424242' }}
                />
              </Box>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default GroupMembers;