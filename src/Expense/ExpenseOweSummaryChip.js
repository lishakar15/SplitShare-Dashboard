import { Chip } from "@mui/material";
import React, { useEffect, useState } from "react";

const ExpenseOweSummaryChip = ({ expense, loggedInUserId }) => {
  const paidUsersList = expense.paidUsers;
  const participantShareList = expense.participantShareList;
  const [balanceAmount, setbalanceAmount] = useState(0);

  useEffect(() => {
    const paidAmount = paidUsersList.find((user) => user.userId === loggedInUserId)?.paidAmount || 0;
    const shareAmount = participantShareList.find((participant) => participant.userId === loggedInUserId)?.shareAmount || 0

    setbalanceAmount(paidAmount - shareAmount);
  }, []);

  return (
    <>
      <Chip
        label={
          balanceAmount === 0
            ? `You are not involved`
            : balanceAmount > 0
            ? `You get ₹${balanceAmount.toFixed(2)}`
            : `You owe ₹${Math.abs(balanceAmount.toFixed(2))}`
        }
        color={ balanceAmount > 0 ? "success" : balanceAmount < 0 ? "error" : "#e0e0e0"}
        size="small"
        variant="outlined"
      />
    </>
  );
};

export default ExpenseOweSummaryChip;
