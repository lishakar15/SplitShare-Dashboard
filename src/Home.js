import React from "react";
import { useEffect, useState, useCallback } from "react";
import BalanceBoard from "./Balance/BalanceBoard";
import BalanceAppBar from "./Balance/BalanceAppBar";
import BalanceCard from "./Balance/BalanceCard";
import { useLocation, useNavigate } from "react-router-dom";
import { backendService } from "./services/backendServices";
import { loggedInUserAtom } from './atoms/UserAtom';
import { useAtomValue } from 'jotai';
import CustomizedSnackbars from "./utilities/CustomSnackBar";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const [inviteParams, setInviteParams] = useState({
    invitedBy: null,
    groupId: null,
    inviteToken: null
  });
  const loggedInUser = useAtomValue(loggedInUserAtom);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSuccess, setSnackbarSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const acceptUserGroupInvite = useCallback(async (params) => {
    if (loggedInUser.userId && params.inviteToken) {
      setIsLoading(true);
      try {
        let message = null;
        if (params.groupId) {
          const groupInvite = {
            groupId: params.groupId,
            userId: loggedInUser.userId
          }
          message = await backendService.joinUserInGroup(groupInvite, params.inviteToken);
        } else if (params.invitedBy) {
          const userInvite = {  
            userId1: loggedInUser.userId,
            userId2: params.invitedBy,
            createdBy: params.invitedBy
          }
          message = await backendService.acceptInvite(userInvite, params.inviteToken);
        }
        if (message) {
          setSnackbarMessage(message);
          setSnackbarSuccess(!(message.includes("fail") || message.includes("Invalid")));
          setSnackbarOpen(true);
          navigate("/home");
        }
      } catch (error) {
        console.error("Error accepting user/group invite:", error);
        setSnackbarMessage("An error occurred while accepting the invite. Please try again.");
        setSnackbarSuccess(false);
        setSnackbarOpen(true);
      } finally {
        setIsLoading(false);
      }
    }
  }, [loggedInUser.userId, navigate]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const newParams = {
      invitedBy: urlParams.get('invitedBy'),
      groupId: urlParams.get('groupId'),
      inviteToken: urlParams.get('token')
    };
    
    setInviteParams(newParams);
    
    if (newParams.inviteToken && !isLoading) {
      acceptUserGroupInvite(newParams);
    }
  }, [location.search, acceptUserGroupInvite, isLoading]);

  return (
    <>
      <BalanceBoard />
      <BalanceAppBar />
      <BalanceCard />
      <CustomizedSnackbars
        open={snackbarOpen}
        setOpen={setSnackbarOpen}
        message={snackbarMessage}
        isSuccess={snackbarSuccess}
        verticalPos={"top"}
        horizontalPos={"right"}
      />
      {isLoading && <div>Loading...</div>}
    </>
  );
};

export default Home;