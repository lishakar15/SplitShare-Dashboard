import React, { useEffect, useState } from "react";
import {
  AvatarGroup,
  Box,
  Card,
  CardContent,
  Typography,
  useTheme,
  useMediaQuery,
  Container,
} from "@mui/material";
import AvatarGenerator from "../AvatarGenerator";
import GroupOweSummaryChip from "./GroupOweSummaryChip";
import { useNavigate } from "react-router-dom";
import { backendService } from "../services/backendServices";
import { useAtom, useAtomValue } from "jotai";
import { loggedInUserAtom } from "../atoms/UserAtom";
import { refetchTriggerAtom } from "../atoms/Atoms";

const GroupList = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [groupsData, setGroupsData] = useState(null);
  const [groupsOweSummaryList, setGroupsOweSummaryList] = useState(null);
  const navigate = useNavigate();
  const loggedInUser = useAtomValue(loggedInUserAtom);
  const [refreshTrigger, setRefreshTrigger] = useAtom(refetchTriggerAtom);

  const handleGroupClick = (groupId) => {
    navigate(`/expenses/group/${groupId}`);
  };

  useEffect(() => {
    const fetchGroupsData = async () => {
      try {
        const response = await backendService.getGroupsDataByUserId(loggedInUser.userId);
        if (response) {
          setGroupsData([...response]);
        }
      } catch (error) {
        console.error("Error fetching groups data: ", error);
      }
    };

    fetchGroupsData();
  }, [refreshTrigger]);

  useEffect(() => {
    const fetchoGroupSummaryData = async () => {
      try {
        const response = await backendService.getAllGroupBalanceSummary(loggedInUser.userId);
        setGroupsOweSummaryList([...response]);
      } catch (err) {
        console.log("Error fetching groups balance summary data");
      }
    };
    fetchoGroupSummaryData();
  }, [refreshTrigger]);

  if (!groupsData) {
    return (
      <Box
        sx={{
          height: { xs: "auto", sm: "40vh" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: { xs: 2, sm: 4 },
        }}
      >
        <Box sx={{ 
          width: "100%", 
          maxWidth: "500px",
          display: "flex", 
          justifyContent: "center" 
        }}>
          <img
            src="group-image.jpg"
            alt="group-image"
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "300px",
              objectFit: "contain",
            }}
          />
        </Box>
        <Typography
          variant={isMobile ? "h6" : "h5"}
          sx={{
            color: "gray",
            textAlign: "center",
            mt: 2,
            px: 2,
          }}
        >
          You don't belong to any group! Start your Journey by creating Groups with your friends and family!!
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth={false} disableGutters>
      {groupsData.map((group, index) => (
        <Card 
          key={index} 
          sx={{ 
            my: { xs: 1, sm: 2 }, 
            border: "1px solid #e5e7eb"
          }}
        >
          <CardContent
            onClick={() => handleGroupClick(group.groupId)}
            sx={{
              px: { xs: 2, sm: 3 },
              py: { xs: 2, sm: 2 },
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "center" },
              gap: { xs: 2, sm: 0 },
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "grey.300",
              },
              transition: "background-color 0.3s ease",
            }}
          >
            <Box 
              sx={{ 
                display: "flex",
                width: { xs: "100%", sm: "auto" },
                alignItems: "flex-start",
              }}
            >
              <Box sx={{ flexShrink: 0 }}>
                <AvatarGenerator 
                  userName={group.groupName} 
                  size={isMobile ? "md" : "lg"} 
                />
              </Box>
              <Box sx={{ ml: 2, flex: 1 }}>
                <Typography 
                  sx={{ 
                    fontWeight: "bold", 
                    color: "#512DA8",
                    fontSize: { xs: "1rem", sm: "1.1rem" }
                  }}
                >
                  {group.groupName}
                </Typography>
                <Typography 
                  sx={{ 
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                    wordBreak: "break-word"
                  }}
                >
                  {group.groupMembers.map((member, index) => (
                    <React.Fragment key={member.userId}>
                      {member.userName}
                      {index < group.groupMembers.length - 1 ? ", " : ""}
                    </React.Fragment>
                  ))}
                </Typography>
                <Box sx={{ display: "flex", mt: 1 }}>
                  <AvatarGroup 
                    max={isMobile ? 3 : 4}
                    total={group.groupMembers.length}
                    sx={{ 
                      '& .MuiAvatar-root': { 
                        width: { xs: 24, sm: 32 }, 
                        height: { xs: 24, sm: 32 } 
                      } 
                    }}
                  >
                    {group.groupMembers.map((member) => (
                      <AvatarGenerator
                        key={member.userId}
                        userName={member.userName}
                        size={isMobile ? "xs" : "sm"}
                      />
                    ))}
                  </AvatarGroup>
                </Box>
              </Box>
            </Box>
            <Box sx={{ 
              width: { xs: "100%", sm: "auto" },
              mt: { xs: 1, sm: 0 }
            }}>
              {groupsOweSummaryList && (
                <GroupOweSummaryChip 
                  currentGroupId={group.groupId} 
                  groupOweList={groupsOweSummaryList} 
                />
              )}
            </Box>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default GroupList;