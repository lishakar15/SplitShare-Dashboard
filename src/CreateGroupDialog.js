import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions, Autocomplete, Box, Typography, Divider, CircularProgress } from '@mui/material';
import UserMemberCard from './UserMemberCard';
import { useAtom, useAtomValue } from 'jotai';
import { loggedInUserAtom } from './atoms/UserAtom';
import UserAvatarLabel from './UserAvatarLabel';
import { backendService } from './services/backendServices';
import CustomizedSnackbars from './utilities/CustomSnackBar';
import { refetchTriggerAtom } from './atoms/Atoms';

const CreateGroupDialog = ({ open, onClose, groupId, isModifyReq }) => {
  const [groupName, setGroupName] = useState('');
  const [userOptionList, setUserOptionList] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [groupNameError, setGroupNameError] = useState(false);
  const loggedInUser = useAtomValue(loggedInUserAtom);
  const today = new Date().toISOString();
  const [createDate, setCreateDate] = useState(today);
  const [createdBy, setCreatedBy] = useState(loggedInUser.userId);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSuccess, setSnackbarSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModify, setIsModify] = useState(isModifyReq);
  const [refreshTrigger, setRefreshTrigger] = useAtom(refetchTriggerAtom);
  const [copyButtonText, setCopyButtonText] = useState('Copy invite link');

  useEffect(() => {
    const getAllFriends = async () => {
      if (loggedInUser) {
        try {
          setIsLoading(true);
          const response = await backendService.getAllFriendsListByUserId(loggedInUser.userId);
          if (response) {
            const friendsList = response.filter((user) => user.userId !== loggedInUser.userId);
            setUserOptionList(friendsList);
            if (!isModify) {
              const defaultMember = {
                userId: loggedInUser.userId,
                userName: loggedInUser.fullUserName
              }
              setSelectedMembers([defaultMember]);
            }
          }
        } catch (err) {
          console.log("Error occurred while fetching users " + err);
          setSnackbarMessage("Error fetching users");
          setSnackbarSuccess(false);
          setSnackbarOpen(true);
        } finally {
          setIsLoading(false);
        }
      }
    };
    getAllFriends();
  }, [loggedInUser]);

  useEffect(() => {
    const getGroupDetails = async () => {
      if (groupId) {
        try {
          setIsLoading(true);
          const response = await backendService.getGroupDetailsForModify(groupId);
          console.log(JSON.stringify(response));
          if (response) {
            populateGroupResponse(response);
          }
        } catch (err) {
          console.log("Error occurred while fetching Group Details");
          setSnackbarMessage("Error fetching group details");
          setSnackbarSuccess(false);
          setSnackbarOpen(true);
        } finally {
          setIsLoading(false);
        }
      }
    };
    getGroupDetails();
  }, [groupId]);

  const handleSubmit = async () => {
    if (!groupName) {
      setGroupNameError(true);
      return;
    }
    setIsLoading(true);
    const groupRequest = createGroupRequest();
    try {
      let isSuccess;
      if (isModifyReq) {
        isSuccess = await backendService.updateGroupWithMembers(groupRequest);
      } else {
        isSuccess = await backendService.createGroupWithMembers(groupRequest);
      }
      if (isSuccess) {
        setSnackbarMessage(isModifyReq ? "Group Updated Successfully" : "Group Created Successfully");
        setSnackbarSuccess(true);
      } else {
        setSnackbarMessage(isModifyReq ? "Error updating group" : "Error creating group");
        setSnackbarSuccess(false);
      }
    } catch (error) {
      console.error("Error saving group:", error);
      setSnackbarMessage(isModifyReq ? "Error updating group" : "Error creating group");
      setSnackbarSuccess(false);
    } finally {
      setIsLoading(false);
      setSnackbarOpen(true);
      setTimeout(() => {
        onClose();
        setRefreshTrigger((preVal) => !preVal);
      }, 1000);
    }
  };

  const createGroupRequest = () => {

    const groupRequest = {
      group: {
        groupId: isModify ? groupId : null,
        groupName: groupName,
        createdBy: createdBy,
        createdAt: createDate,
        lastUpdated: today
      },
      groupMemberDetails: selectedMembers.map((member) => ({
        userId: member.userId,
        groupId: isModify ? groupId : null,
        joinedAt: member.joinedAt || today
      }))
    };
    return groupRequest;
  };

  const handleAddMembers = (newMembers) => {
    setSelectedMembers(newMembers);
  };

  const handleDelete = (deleteUserId) => {
    const newMemberList = selectedMembers.filter((member) => member.userId !== deleteUserId);
    setSelectedMembers(newMemberList);
  };

  const populateGroupResponse = (groupResponse) => {
    if (groupResponse) {
      const group = groupResponse.group;
      const groupMembers = groupResponse.groupMemberDetails;
      if (group) {
        setGroupName(group.groupName);
        setCreatedBy(group.createdBy);
        setCreateDate(group.createdAt);
      }
      if (groupMembers && groupMembers.length > 0) {
        setSelectedMembers(groupMembers);
      }
    }
  };

  const handleCopyLink = async () => {
    setCopyButtonText("Creating invite link...");
    const inviteLink = await getInviteUrl();
    console.log("Link " + inviteLink);

    if (inviteLink !== null && inviteLink !== "") {
      navigator.clipboard.writeText(inviteLink)
        .then(() => {
          setSnackbarMessage("Invite link copied to clipboard!");
          setSnackbarSuccess(true);
          setSnackbarOpen(true);
        })
        .catch(err => {
          console.log(err)
          setSnackbarMessage("Failed to copy the invite link");
          setSnackbarSuccess(false);
          setSnackbarOpen(true);
        })
        .finally(() => {
          setCopyButtonText("Copy invite link");
        });
    }
  };
  const getInviteUrl = async () => {
    const baseUrl = window.location.origin;
    const inviteParams = {
      groupId: groupId,
      baseUrl: baseUrl
    }
    return await backendService.createInviteLink(inviteParams);
  }

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
    setGroupNameError(false);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: "bold" }}>{isModifyReq ? "Modify Group" : "New Group"}</DialogTitle>
        <Divider />
        <DialogContent>
          <>
            <Typography sx={{ fontWeight: "bold" }}>Group Name</Typography>
            <TextField
              value={groupName}
              placeholder='Awesome Squad'
              onChange={handleGroupNameChange}
              fullWidth
              error={groupNameError}
              helperText={groupNameError ? 'Group Name is required' : ''}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 2 }}>
              <Typography sx={{ fontWeight: "bold" }}>Members</Typography>
              <Button
                variant="contained"
                onClick={handleCopyLink}
                sx={{ textTransform: 'none', bgcolor: "#e0e7ff", color: "#4338ca", borderRadius: 2 }}
              >
                {copyButtonText}
              </Button>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
              <Divider orientation="vertical" flexItem sx={{ mr: 2 }} />
              <Typography>
                Add existing friends or new SplitShare users as members. Share the invitation link to let friends or new users join later.
              </Typography>
            </Box>
            {selectedMembers && selectedMembers.map((member, index) => (
              member && <Box key={index} display="flex" alignItems="center">
                <UserMemberCard
                  userId={member.userId}
                  userName={member.userName}
                  handleUserCardDelete={handleDelete}
                  showRadioBtn={loggedInUser.userId === member.userId}
                />
              </Box>
            ))}
            <Autocomplete
              multiple
              options={userOptionList}
              getOptionLabel={(option) => option.userName}
              onChange={(event, newValue) => handleAddMembers(newValue)}
              value={selectedMembers}
              disableClearable
              renderTags={() => null}
              filterOptions={(options, state) => {
                const inputValue = state.inputValue.toLowerCase();
                if (inputValue === '') {
                  return options.slice(0, 4);
                }
                return options.filter(option =>
                  option.userName.toLowerCase().startsWith(inputValue)
                ).slice(0, 4);
              }}
              renderInput={(params) => (
                <TextField {...params} placeholder="Search members" margin="normal" />
              )}
              renderOption={(props, option) => (
                <li {...props}>
                  <UserAvatarLabel userName={option.userName} />
                </li>
              )}
            />
          </>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary" disabled={isLoading}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary" disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : (isModifyReq ? "Update" : "Create")}
          </Button>
        </DialogActions>
      </Dialog>
      <CustomizedSnackbars
        open={snackbarOpen}
        setOpen={setSnackbarOpen}
        message={snackbarMessage}
        isSuccess={snackbarSuccess}
      />
    </>
  );
};

export default CreateGroupDialog;