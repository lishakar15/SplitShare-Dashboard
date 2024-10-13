import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { getSplitTypeIcon, getSplitTypeText } from "./SplitTypeService";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import { Link } from "react-router-dom";
import {
  AvatarGroup,
  Box,
  Chip,
  Divider,
  Grid,
  useMediaQuery,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AvatarGenerator from "../AvatarGenerator";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { useTheme } from "@mui/material/styles";
import ExpenseOweSummaryChip from "./ExpenseOweSummaryChip";
import ExpenseSummary from "./ExpenseSummary";
import TimelineIcon from "@mui/icons-material/Timeline";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import CommentSection from "./CommentSection";
import ExpenseDialog from "./Create Expense/ExpenseDialog";
import { backendService } from "../services/backendServices";
import { useAtomValue } from "jotai";
import { loggedInUserAtom } from "../atoms/UserAtom";
import ActivityList from "../ActivityList";
import Expense from "./Expenses";

const ExpenseList = ({ groupId }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [isOpenExpenseDialog, setIsOpenExpenseDialog] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [expenseList, setExpenseList] = useState([]);
  const loggedInUser = useAtomValue(loggedInUserAtom);
  const [expanded, setExpanded] = useState(false);

  const handleModifyExpense = (event, selectedExpenseId) => {
    event.stopPropagation();
    setSelectedExpense(expenseList.find((expense) => expense.expenseId === selectedExpenseId));
    setIsOpenExpenseDialog(true);
  };

  const handleExpenseDialogClose = () => {
    setIsOpenExpenseDialog(false);
  };

  const fetchExpenses = async () => {
    let expenses = [];
    if (groupId) {
      expenses = await backendService.getExpensesByGroupId(groupId);
    }
    else {
      expenses = await backendService.getAllExpensesByUserId(loggedInUser.userId);
    }
    if (expenses) {
      setExpenseList(expenses);
    }

  };

  useEffect(() => {
    fetchExpenses();
  }, [groupId]);

  const handleAccordionChange = (index) => {
    setExpanded(prev => (prev === index ? false : index));
  };

  return (
    <>
      {expenseList.length > 0 ? (
        expenseList.map((expense, index) => (
          <Accordion key={expense.expenseId} onChange={() => handleAccordionChange(index)}>
            <AccordionSummary aria-controls="panel2-content" id="panel2-header">
              <Box
                container
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: isSmallScreen ? "flex-start" : "center",
                  width: "100%",
                  flexDirection: isSmallScreen ? "column" : "row",
                  gap: isSmallScreen ? 2 : "",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ whiteSpace: "nowrap" }}>
                    {expense.expenseDescription}
                  </Typography>
                  <KeyboardArrowDownIcon />
                  <Chip
                    label={"🎬 " + expense.category}
                    size="small"
                    variant="outlined"
                    sx={{ ml: 1 }}
                  />
                  {!groupId &&
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1, ml: 2 }}>
                      <GroupsOutlinedIcon />
                      <Link style={{ textDecoration: "none" }} to={`/expenses/group/${expense.groupId}`} onClick={(event) => event.stopPropagation()}>
                        <Typography sx={{ color: "gray", "&:hover": { textDecoration: "underline" } }}>{expense.groupName}</Typography>
                      </Link>
                    </Box>
                  }
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <AvatarGroup total={expense.paidUsers.length} max={4}>
                        {expense.paidUsers.map((user) => (
                          <AvatarGenerator
                            key={user.userId}
                            userName={user.userName}
                            size={"xs"}
                          />
                        ))}
                      </AvatarGroup>
                      <Typography
                        sx={{ whiteSpace: "nowrap", fontWeight: "bold" }}
                      >
                        {expense.paidUsers.map((user, index) => (
                          <React.Fragment key={user.userId}>
                            {user.userName}
                            {index < expense.paidUsers.length - 1 ? ", " : ""}
                          </React.Fragment>
                        ))}
                      </Typography>
                      paid
                      <Typography
                        sx={{ whiteSpace: "nowrap", fontWeight: "bold" }}
                      >
                        ₹{expense.totalAmount.toFixed(2)}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <ExpenseOweSummaryChip
                        expense={expense}
                        loggedInUserId={loggedInUser ? loggedInUser.userId : 0}
                      />
                    </Box>
                  </Box>

                  <Typography
                    sx={{
                      whiteSpace: "nowrap",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    {getSplitTypeIcon(expense.splitType)}
                    {expense.participantShareList.length}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  ml: 4,
                }}
              >
                <ModeEditOutlineOutlinedIcon
                  onClick={(event) => handleModifyExpense(event, expense.expenseId)}
                />
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <InsertChartOutlinedIcon />
                    Summary
                  </Typography>
                  <Box
                    sx={{
                      p: 1,
                      border: "1px solid lightgray",
                      borderRadius: 1,
                      bgcolor: "#f9fafb",
                      my: 1,
                    }}
                  >
                    <Typography
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <SwapHorizIcon />
                      Split
                      <Typography sx={{ fontWeight: "bold" }}>
                        ₹{expense.totalAmount.toFixed(2)}{" "}
                        {getSplitTypeText(expense.splitType)}{" "}
                      </Typography>
                      between
                      <Typography sx={{ fontWeight: "bold" }}>
                        {expense.participantShareList.length} people
                      </Typography>
                    </Typography>
                  </Box>

                  <ExpenseSummary expense={expense} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <TimelineIcon />
                      Activities
                    </Typography>
                    {expanded === index && <ActivityList isFromAccordian={true} expenseId={expense.expenseId}/>}
                  </Box>

                </Grid>
              </Grid>
              {expanded === index && <CommentSection expenseId={expense.expenseId} />}
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography>You are all Settled up!!!</Typography>
        </Box>
      )}
      <ExpenseDialog
        open={isOpenExpenseDialog}
        onClose={handleExpenseDialogClose}
        isModReq={true}
        expenseData={selectedExpense}
        refreshExpenses={fetchExpenses}
      />
    </>
  );
};

export default ExpenseList;
