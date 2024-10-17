import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions, Autocomplete, Box, Typography, Divider, CircularProgress } from '@mui/material';
import UserMemberCard from './UserMemberCard';
import { useAtomValue } from 'jotai';
import { loggedInUserAtom } from './atoms/UserAtom';
import UserAvatarLabel from './UserAvatarLabel';
import { backendService } from './services/backendServices';
import CustomizedSnackbars from './utilities/CustomSnackBar';

const CreateGroupDialog = ({ open, onClose, groupId }) => {
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
  const [isModifying, setIsModifying] = useState(false);

  useEffect(() => {
    const getAllGroupMembers = async () => {
      if (loggedInUser) {
        try {
          setIsLoading(true);
          const response = await backendService.getGroupMembersByUserId(loggedInUser.userId);
          if (response) {
            const membersList = response.filter((member) => member.userId !== loggedInUser.userId);
            setUserOptionList(membersList);
            if (!isModifying) {
              setSelectedMembers([loggedInUser]);
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
    getAllGroupMembers();
  }, [loggedInUser, isModifying]);

  useEffect(() => {
    const getGroupDetails = async () => {
      if (groupId) {
        try {
          setIsLoading(true);
          setIsModifying(true);
          const response = await backendService.getGroupDetailsForModify(groupId);
          console.log("response == "+response);
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
      } else {
        setIsModifying(false);
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
      if (isModifying) {
        isSuccess = await backendService.updateGroupWithMembers(groupId, groupRequest);
      } else {
        isSuccess = await backendService.createGroupWithMembers(groupRequest);
      }
      if (isSuccess) {
        setSnackbarMessage(isModifying ? "Group Updated Successfully" : "Group Created Successfully");
        setSnackbarSuccess(true);
      } else {
        setSnackbarMessage(isModifying ? "Error updating group" : "Error creating group");
        setSnackbarSuccess(false);
      }
    } catch (error) {
      console.error("Error saving group:", error);
      setSnackbarMessage(isModifying ? "Error updating group" : "Error creating group");
      setSnackbarSuccess(false);
    } finally {
      setIsLoading(false);
      setSnackbarOpen(true);
      setTimeout(() => {
        onClose();
      }, 1000);
    }
  };

  const createGroupRequest = () => {
    const groupRequest = {
      group: {
        groupName: groupName,
        createdBy: createdBy,
        createdAt: createDate,
        lastUpdated: today
      },
      groupMemberDetails: selectedMembers.map((member) => ({
        userId: member.userId,
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
    console.log(JSON.stringify(groupResponse));
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

  const handleCopyLink = () => {
    const baseUrl = window.location.origin;
    navigator.clipboard.writeText(`${baseUrl}/user/register-user`);
  };

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
    setGroupNameError(false);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: "bold" }}>{isModifying ? "Modify Group" : "New Group"}</DialogTitle>
        <Divider />
        <DialogContent>
          {isLoading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="200px">
              <CircularProgress />
            </Box>
          ) : (
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
                  Copy invite link
                </Button>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
                <Divider orientation="vertical" flexItem sx={{ mr: 2 }} />
                <Typography>
                  Add existing friends or new SplitShare users as members. Share the invitation link to let friends or new users join later.
                </Typography>
              </Box>
              {selectedMembers.map((member, index) => (
                <Box key={index} display="flex" alignItems="center">
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
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary" disabled={isLoading}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary" disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : (isModifying ? "Update" : "Create")}
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