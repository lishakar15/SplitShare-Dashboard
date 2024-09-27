import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { getSplitTypeIcon, getSplitTypeText } from "./SplitTypeService";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
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

const ExpenseList = ({ groupId }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [isOpenExpenseDialog, setIsOpenExpenseDialog] = useState(false);
  const [seletedExpense, setSelectedExpense] = useState(null);
  const [exenseList, setExpenseList] = useState([]);

  const handleModifyExpense = (selectedExpenseId) => {
    //Loop throug the acual data and set the selected Expense
    setSelectedExpense(exenseList.find((expense) => expense.expenseId === selectedExpenseId));
    setIsOpenExpenseDialog(true);
  };
  const handleExpenseDialogClose = () => {
    setIsOpenExpenseDialog(false);
  };

  useEffect(() => {

    const getExpenses = async () => {
      if (groupId) {
        const expenses = await backendService.getExpensesByGroupId(groupId);
        setExpenseList(expenses);
      }
    }
    getExpenses()
  }, [groupId]);
  return (
    <>
      {exenseList ? (
        exenseList.map((expense) => (
          <Accordion>
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
                        loggedInUserId={101}
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
                  onClick={() => handleModifyExpense(expense.expenseId)}
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
                </Grid>
              </Grid>
              <CommentSection expenseId={expense.expenseId} />
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "ceneter",
          }}
        >
          <Typography>You are all Settled up!!!</Typography>
        </Box>
      )}
      <ExpenseDialog
        open={isOpenExpenseDialog}
        onClose={handleExpenseDialogClose}
        isModReq={true}
        expenseData={seletedExpense}
      />
    </>
  );
};

export default ExpenseList;
