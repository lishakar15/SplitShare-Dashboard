import React from "react";
import { GROUP_DATA } from "../data/groupsData";
import ExpenseGroupInfoCard from "./ExpenseGroupInfoCard";
import ExpenseTabs from "./ExpenseTabs";
import { useParams } from "react-router-dom";

const Expense = () => {
  const { groupId } = useParams();
  const group = groupId
    ? GROUP_DATA.find((group) => group.groupId === parseInt(groupId))
    : GROUP_DATA[1];

  return (
    <>
      <ExpenseGroupInfoCard group={group} />
      <ExpenseTabs />
    </>
  );
};

export default Expense;
