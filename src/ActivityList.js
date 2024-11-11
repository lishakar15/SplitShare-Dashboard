import React, { useEffect, useState } from 'react';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import { Typography, Box, Button } from '@mui/material';
import { timelineItemClasses } from '@mui/lab/TimelineItem';
import PaymentIcon from '@mui/icons-material/Payment';
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import { backendService } from './services/backendServices';
import { formatDateToString } from './utilities/dateFormater';
import { useAtomValue } from 'jotai';
import { loggedInUserAtom } from './atoms/UserAtom';
import ExpenseDialog from './Expense/Create Expense/ExpenseDialog';
import PaymentDialog from './Payment/PaymentDialog';
import CustomizedSnackbars from './utilities/CustomSnackBar';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
const ActivityList = ({ groupId, expenseId, settlementId, isFromAccordian = false }) => {

  const [activities, setActivities] = useState([]);
  const loggedInUser = useAtomValue(loggedInUserAtom);
  const [isOpenExpenseDialog, setIsOpenExpenseDialog] = useState(false);
  const [isOpenSettlementDialog, setIsOpenSettlementDialog] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [selectedSettlement, setSelectedSettlement] = useState(null);
  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSuccess, setSnackbarSuccess] = useState(false);


  useEffect(() => {

    const getActivities = async () => {

      try {
        let response = [];
        if (expenseId) {
          response = await backendService.getAllActivitiesByExpenseId(expenseId);
        }
        else if (settlementId) {
          response = await backendService.getAllActivitiesBySettlementId(settlementId);
        }
        else if (groupId) {
          response = await backendService.getGroupActivitiesByGroupId(groupId);
        }

        else if (loggedInUser) {
          response = await backendService.getAllActivitiesByUserId(loggedInUser.userId);
        }
        if (response) {
          setActivities(response);
        }
      }
      catch (err) {
        console.log("Error fecthing group activites " + err);
      }
    }
    getActivities();

  }, [groupId, loggedInUser]);

  const handleExpenseDialogClose = () => {
    setSelectedExpense(null);
    setIsOpenExpenseDialog(false);
  };

  const handleExpenseEdit = async (selectedExpenseId) => {
    if (selectedExpenseId) {
      try {
        const response = await backendService.getExpenseByExpenseId(selectedExpenseId, loggedInUser.userId);
        if (response !== null && response !=="") {
          setSelectedExpense(response);
          setIsOpenExpenseDialog(true);
        }
        else{
          setSnackbarMessage("Expense No Longer Exists");
          setSnackbarSuccess(false);
          setSnackbarOpen(true);
        }
      }
      catch (err) {
        console.log("Error fecthing expense data " + err);
      }
    }
  }
  const handleSettlementEdit = async (selectedSettlementId) => {
    if(selectedSettlementId){
      try{
        const response = await backendService.getSettlementBySettlementId(selectedSettlementId, loggedInUser.userId);
        if(response !== null && response !==""){
          setSelectedSettlement(response);
          setIsOpenSettlementDialog(true);
        }
        else{
          setSnackbarMessage("Payment No Longer Exists");
          setSnackbarSuccess(false);
          setSnackbarOpen(true);
        }

      }
      catch(err){
        console.log("Error fetching settlement data "+err);
      }
    }
  }
  
  const handleSettlementDialogClose = () => {
    setSelectedSettlement(null);
    setIsOpenSettlementDialog(false);
  };

  const isShowEditButton = (activityType) => {
    const excludeEditShowList = ["USER_ADDED", "USER_REMOVED", "EXPENSE_DELETED","PAYMENT_DELETED","COMMENT_DELETED"];
    return !excludeEditShowList.find((type) => type === activityType);
  }

  return (
    <>
      <Box sx={{ display: "flex", mt:-2}}>
        <Timeline
          sx={{
            [`& .${timelineItemClasses.root}:before`]: {
              flex: 0,
              padding: 0,
            },
          }}
        >
          {activities && activities.length > 0 ? activities.map((activity, index) => (
            <TimelineItem key={index}>
              <TimelineSeparator>
                <TimelineDot color={activity.activityType.startsWith('PAYMENT') ? 'success' : activity.activityType.startsWith('USER') ? 'grey' :'primary'}>
                  {activity.activityType.startsWith('EXPENSE') && <PaymentIcon />}
                  {activity.activityType.startsWith('PAYMENT') && <PaidOutlinedIcon />}
                  {activity.activityType === 'USER_ADDED' && <PersonAddIcon />}
                  {activity.activityType === 'USER_REMOVED' && <PersonRemoveIcon/>}
                </TimelineDot>
                {index < activities.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent sx={{ m: 'auto 0' }}>
                <Box sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: { xs: "flex-start", md: "space-between" },
                  alignItems: { xs: "flex-start", md: "center" },
                  gap: { xs: 1, md: 0 },
                }} >
                  <Box>
                    <Typography variant="body1" fontWeight="bold" component="span" ml={1}>
                      {activity.message}
                    </Typography>
                    <Box>
                      {activity.changeLogs && activity.changeLogs.map((changeLog, index) => (
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            p: 0.5,
                            backgroundColor: '#f5f5f5',
                            borderRadius: 1,
                            border: '1px solid #e0e0e0',
                          }}
                        >
                          <Typography
                            variant="body1"
                            component="span"
                            sx={{ color: 'gray', mx: 1 }}
                          >
                            •
                          </Typography>
                          <Typography>{changeLog.changeMessage}</Typography>
                        </Box>

                      ))}
                    </Box>

                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    {
                      isFromAccordian === false && isShowEditButton(activity.activityType) &&
                      <Button
                        size="small"
                        variant="outlined"
                        sx={{ textTransform: "none" }}
                        onClick={() => {
                          if (activity.expenseId) {
                            handleExpenseEdit(activity.expenseId);
                          } else if (activity.settlementId) {
                            handleSettlementEdit(activity.settlementId);
                          }
                        }}
                      >
                        Edit
                      </Button>
                    }
                    <Typography color="text.secondary" sx={{ fontWeight: "bold", whiteSpace:"nowrap"}}>
                      {activity.createDate ? formatDateToString(activity.createDate) : ""}
                    </Typography>
                  </Box>
                </Box>
              </TimelineContent>
            </TimelineItem>
          ))
            :
            <Box sx={{display:"flex", justifyContent:"center"}}>
                <Typography>
                  No Activities yet
                </Typography>
            </Box>
          } 

        </Timeline>
      </Box>
      <ExpenseDialog
        open={isOpenExpenseDialog}
        onClose={handleExpenseDialogClose}
        isModReq={true}
        expenseData={selectedExpense}
      />
      <PaymentDialog
        open={isOpenSettlementDialog}
        onClose={handleSettlementDialogClose}
        settlementReq={selectedSettlement}
        isModReq={true}
      />
      <CustomizedSnackbars
        open={snackbarOpen}
        setOpen={setSnackbarOpen}
        message={snackbarMessage}
        isSuccess={snackbarSuccess}
      />
    </>
  );
};

export default ActivityList;