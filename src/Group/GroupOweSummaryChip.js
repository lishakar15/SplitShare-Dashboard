import { Chip } from "@mui/material";
import React, { useEffect, useState } from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const GroupOweSummaryChip = ({ currentGroupId, groupOweList }) => {
  const [groupOwe, setGroupOwe] = useState(null);

  useEffect(() => {
    setGroupOwe(
      groupOweList.find((grpOwe) => currentGroupId === grpOwe.groupId)
    );
  }, []);

  return (
    <>
      {groupOwe ? (
        <Chip
          label={
            groupOwe.isOwed
              ? `You get ₹${groupOwe.amount? groupOwe.amount.toFixed(2): 0.00}`
              : `You owe ₹${groupOwe.amount? groupOwe.amount.toFixed(2): 0.00}`
          }
          color={groupOwe.isOwed ? "success" : "error"}
          size="small"
          variant="outlined"
        />
      ) : (
        <Chip
          icon={<CheckCircleIcon/>}
          label={"You are settled up"}
          color={"success"}
          size="small"
          variant="outlined"
        />
      )}
    </>
  );
};

export default GroupOweSummaryChip;
