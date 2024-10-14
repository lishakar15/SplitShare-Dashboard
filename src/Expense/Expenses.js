import React, { useEffect, useState } from "react";
import ExpenseGroupInfoCard from "./ExpenseGroupInfoCard";
import ExpenseTabs from "./ExpenseTabs";
import { useParams } from "react-router-dom";
import { backendService } from "../services/backendServices";
import ExpenseSettlementBar from "./ExpenseSettlementBar";
import GroupBalanceCardsSection from "../Group/GroupBalanceCardsSection";
import { useAtomValue } from "jotai";
import { loggedInUserAtom } from "../atoms/UserAtom";
import { Typography } from "@mui/material";

const Expense = () => {
  const { groupId } = useParams();
  const [groupData, setGroupData] = useState(null);
  const loggedInUser = useAtomValue(loggedInUserAtom);
  const [showGroupData, setShowGroupData] = useState(true);

  useEffect(() => {
    const getGroupData = async () => {
      if (groupId && loggedInUser) {
        try {
          const response = await backendService.getGroupDataByGroupId(groupId, loggedInUser.userId);

          if (response) {
            setGroupData(response);
            setShowGroupData(true); 
          } else {
            setShowGroupData(false); 
          }
        } catch (err) {
          console.log("Error occurred while fetching group data: " + err);
          setShowGroupData(false);
        }
      }
    };

    getGroupData();
  }, [groupId, loggedInUser]);

  return (
    <>
      {showGroupData ? (
        groupId && groupData ? (
          <>
            <ExpenseGroupInfoCard groupData={groupData} />
            <GroupBalanceCardsSection groupId={groupId} />
            <ExpenseTabs groupId={groupId} />
          </>
        ) : (
          <>
            <ExpenseSettlementBar />
            <ExpenseTabs groupId={groupId} />
          </>
        )
      ) : (
        <Typography variant="h6"
        sx={{
          display:"flex",
          justifyContent:"center",
          mt: 2,
        }}
        >You are not part of this group</Typography>
      )}
    </>
  );
};

export default Expense;
