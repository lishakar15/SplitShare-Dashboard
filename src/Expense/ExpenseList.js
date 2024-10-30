import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Chip,
  Divider,
  Grid,
  useMediaQuery,
  AvatarGroup,
  Stack,
  Paper,
  useTheme
} from "@mui/material";
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  ModeEditOutlineOutlined as ModeEditOutlineOutlinedIcon,
  InsertChartOutlined as InsertChartOutlinedIcon,
  Timeline as TimelineIcon,
  SwapHoriz as SwapHorizIcon,
  Groups as GroupsOutlinedIcon
} from "@mui/icons-material";
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import { Link } from "react-router-dom";
import { useAtomValue } from "jotai";
import { loggedInUserAtom } from "../atoms/UserAtom";
import { getSplitTypeIcon, getSplitTypeText } from "./SplitTypeService";
import AvatarGenerator from "../AvatarGenerator";
import ExpenseOweSummaryChip from "./ExpenseOweSummaryChip";
import ExpenseSummary from "./ExpenseSummary";
import CommentSection from "./CommentSection";
import ExpenseDialog from "./Create Expense/ExpenseDialog";
import { CATEGORY_DATA_MAP } from "../data/CategoryData";
import ActivityList from "../ActivityList";
import { backendService } from "../services/backendServices";

const ExpenseList = ({ groupId }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isOpenExpenseDialog, setIsOpenExpenseDialog] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [expenseList, setExpenseList] = useState([]);
  const loggedInUser = useAtomValue(loggedInUserAtom);
  const [expanded, setExpanded] = useState(false);

  // Existing handlers remain the same
  const handleModifyExpense = (event, selectedExpenseId) => {
    event.stopPropagation();
    setSelectedExpense(expenseList.find((expense) => expense.expenseId === selectedExpenseId));
    setIsOpenExpenseDialog(true);
  };

  const handleExpenseDialogClose = () => {
    setIsOpenExpenseDialog(false);
  };

  const handleAccordionChange = (index) => {
    setExpanded(prev => (prev === index ? false : index));
  };

  const fetchExpenses = async () => {
    try {
      const expenses = groupId
        ? await backendService.getExpensesByGroupId(groupId)
        : await backendService.getAllExpensesByUserId(loggedInUser.userId);
      if (expenses) {
        setExpenseList(expenses);
      }
    } catch (err) {
      console.log("Error occurred while fetching Expense " + err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [groupId]);

  const ExpenseHeader = ({ expense, index }) => (
    <Stack
      direction={isMobile ? "column" : "row"}
      spacing={2}
      width="100%"
      alignItems={isMobile ? "flex-start" : "center"}
      justifyContent="space-between"
    >
      <Stack spacing={1}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <SellOutlinedIcon sx={{ color: "green" }}/>
          <Typography variant={isMobile ? "body2" : "body1"} sx={{ fontWeight: "medium" }}>
            {expense.expenseDescription}
          </Typography>
          {expanded === index ? <KeyboardArrowUpIcon fontSize={isMobile ? "small" : "medium"} /> :
            <KeyboardArrowDownIcon fontSize={isMobile ? "small" : "medium"} />
          }
          <Chip
            label={`${CATEGORY_DATA_MAP.get(expense.category)} `+ expense.category}
            size="small"
            variant="outlined"
          />
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
          {!groupId && (
            <Stack direction="row" spacing={1} alignItems="center">
              <GroupsOutlinedIcon fontSize="small" />
              <Link
                style={{ textDecoration: "none" }}
                to={`/expenses/group/${expense.groupId}`}
                onClick={(e) => e.stopPropagation()}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    "&:hover": { textDecoration: "underline" }
                  }}
                >
                  {expense.groupName}
                </Typography>
              </Link>
            </Stack>
          )}
        </Stack>
      </Stack>

      <Stack spacing={1} width={isMobile ? "100%" : "auto"}>
        <Stack direction="row" spacing={2} alignItems="center" justifyContent={isMobile ? "space-between" : "flex-end"}>
          <Stack direction="row" spacing={1} alignItems="center">
            <AvatarGroup
              total={expense.paidUsers.length}
              max={isMobile ? 2 : 4}
              sx={{ '& .MuiAvatar-root': { width: 24, height: 24 } }}
            >
              {expense.paidUsers.map((user) => (
                <AvatarGenerator
                  key={user.userId}
                  userName={user.userName}
                  size="xs"
                />
              ))}
            </AvatarGroup>
            <Typography variant={isMobile ? "body2" : "body1"}>
              {expense.paidUsers.map((user, index) => (
                <React.Fragment key={user.userId}>
                  {user.userName}
                  {index < expense.paidUsers.length - 1 ? ", " : ""}
                </React.Fragment>
              ))}
              {" "}paid
            </Typography>
          </Stack>
          <Typography variant={isMobile ? "body2" : "body1"} fontWeight="bold">
            ₹{expense.totalAmount.toFixed(2)}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
          <ExpenseOweSummaryChip
            expense={expense}
            loggedInUserId={loggedInUser?.userId || 0}
          />
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {getSplitTypeIcon(expense.splitType)}
            <Typography variant={isMobile ? "body2" : "body1"}>
              {expense.participantShareList.length}
            </Typography>
            <ModeEditOutlineOutlinedIcon
              fontSize={isMobile ? "small" : "medium"}
              onClick={(e) => handleModifyExpense(e, expense.expenseId)}
            />
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );

  if (expenseList.length === 0) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <Typography>You are all Settled up!!!</Typography>
      </Box>
    );
  }

  return (
    <Stack spacing={2}>
      {expenseList.map((expense, index) => (
        <Paper elevation={1} key={expense.expenseId}>
          <Accordion
            onChange={() => handleAccordionChange(index)}
            sx={{ boxShadow: 'none' }}
          >
            <AccordionSummary>
              <ExpenseHeader expense={expense} index ={index}/>
            </AccordionSummary>

            <AccordionDetails>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Stack spacing={2}>
                    <Typography
                      variant={isMobile ? "body2" : "body1"}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <InsertChartOutlinedIcon fontSize={isMobile ? "small" : "medium"} />
                      Summary
                    </Typography>

                    <Paper variant="outlined" sx={{ p: 2, bgcolor: "grey.50" }}>
                      <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                        <SwapHorizIcon fontSize={isMobile ? "small" : "medium"} />
                        <Typography variant={isMobile ? "body2" : "body1"}>
                          Split
                          <Box component="span" sx={{ fontWeight: "bold", mx: 0.5 }}>
                            ₹{expense.totalAmount.toFixed(2)}
                          </Box>
                          {getSplitTypeText(expense.splitType)} between
                          <Box component="span" sx={{ fontWeight: "bold", ml: 0.5 }}>
                            {expense.participantShareList.length} people
                          </Box>
                        </Typography>
                      </Stack>
                    </Paper>

                    <ExpenseSummary expense={expense} />
                  </Stack>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Stack spacing={2}>
                    <Typography
                      variant={isMobile ? "body2" : "body1"}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <TimelineIcon fontSize={isMobile ? "small" : "medium"} />
                      Activities
                    </Typography>
                    {expanded === index && (
                      <ActivityList isFromAccordian={true} expenseId={expense.expenseId} />
                    )}
                  </Stack>
                </Grid>
              </Grid>

              {expanded === index && <CommentSection expenseId={expense.expenseId} />}
            </AccordionDetails>
          </Accordion>
        </Paper>
      ))}

      <ExpenseDialog
        open={isOpenExpenseDialog}
        onClose={handleExpenseDialogClose}
        isModReq={true}
        expenseData={selectedExpense}
      />
    </Stack>
  );
};

export default ExpenseList;