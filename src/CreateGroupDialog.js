import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions, Autocomplete, Box, Typography, Divider } from '@mui/material';
import UserMemberCard from './UserMemberCard';
import { useAtomValue } from 'jotai';
import { loggedInUserAtom } from './atoms/UserAtom';
import UserAvatarLabel from './UserAvatarLabel';
import { backendService } from './services/backendServices';
import CustomizedSnackbars from './utilities/CustomSnackBar';

const memberOptions = [
  { userId: 1, userName: 'Lisha' },
  { userId: 2, userName: 'Jack' },
  { userId: 3, userName: 'Sovon' },
];

const CreateGroupDialog = ({ open, onClose, groupId }) => {
  const [groupName, setGroupName] = useState('');
  const [groupMembers , setGroupMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [groupNameError, setGroupNameError] = useState(false);
  const loggedInUser = useAtomValue(loggedInUserAtom);
  const today = new Date().toISOString();
  const [createDate, setCreateDate] = useState(today);
  const [createdBy, setCreatedBy] = useState(loggedInUser.userId);
    // Snackbar state
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSuccess, setSnackbarSuccess] = useState(false);

  useEffect(() => {
    if(loggedInUser)
    {
      //Api call to retrieve the group members
      const membersList  = memberOptions.filter((member)=> member.userId !== loggedInUser.userId );
      setGroupMembers(membersList);
      setSelectedMembers([loggedInUser]);

    }

  }, [loggedInUser]);

  useEffect(() => {

    const getGroupDetails = async() =>{
      if(groupId){
        try{
          const response = await backendService.getGroupDetailsForModify(groupId);
          if(response){
            //Extract Group Data from Response
            populateGroupResponse(response);
          }
        }
        catch(err){
          console.log("Error occurred while fetching Group Details");
        }
      }

    }
    getGroupDetails();
  }, [groupId]);

  const handleSubmit = () => {
    if (!groupName) {
      setGroupNameError(true);
      return;
    }
    const groupRequest = createGroupRequest();
    const saveGroup = async () => {
      const isGroupSaved = await backendService.createGroupWithMembers(groupRequest);
      if (isGroupSaved) {
        setSnackbarMessage("Group Created Successfully");
        setSnackbarSuccess(true);
        setSnackbarOpen(true);
      }
      else {
        setSnackbarMessage("Group not Created");
        setSnackbarSuccess(false);
        setSnackbarOpen(true);
      }
    }
    saveGroup();
    onClose();
  };

  const createGroupRequest = () => {
    const groupRequest = {
      group: {
        groupName: groupName,
        createdBy: createdBy,
        createdAt: createDate,
        lastUpdated: today
      }
    }
    let membersList = []
    selectedMembers.forEach((member) => {
      const memberObj = {
        userId: member.userId,
        joinedAt: member.joinedAt || today
      }
      membersList = [...membersList, memberObj];
    })
    groupRequest.groupMemberDetails = membersList;
    return groupRequest;
  }
  const handleAddMembers = (newMembers) => {
    setSelectedMembers(newMembers);
  };

  const handleDelete = (deleteUserId) => {
    const newMemberList = selectedMembers.filter((member) => member.userId !== deleteUserId);
    setSelectedMembers(newMemberList);
  };

  const populateGroupResponse = (groupResponse) =>{
    if(groupResponse)
    {
      const group = groupResponse.group;
      const groupMembers = groupResponse.groupMemberDetails;
      if(group)
      {
        setGroupName(group.groupNames);
        setCreatedBy(group.createdBy);
        setCreateDate(group.createDate);
      }
      if(groupMembers && groupMembers.length >0){
        setSelectedMembers([...selectedMembers,groupMembers]);
      }
    }
  }

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
        <DialogTitle sx={{ fontWeight: "bold" }}>New Group</DialogTitle>
        <Divider />
        <DialogContent>
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
            options={memberOptions}
            getOptionLabel={(option) => <UserAvatarLabel userName={option.userName} />}
            onChange={(event, newValue) => handleAddMembers(newValue)}
            value={selectedMembers}
            disableClearable
            renderTags={() => null}
            renderInput={(params) => (
              <TextField {...params} placeholder="Search members" margin="normal" />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">Create</Button>
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
