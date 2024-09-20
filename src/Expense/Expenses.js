import React from "react";
import { GROUP_DATA } from "../data/groupsData";
import ExpenseGroupInfoCard from "./ExpenseGroupInfoCard";
import ExpenseTabs from "./ExpenseTabs";
import ExpenseList from "./ExpenseList";


const Expense = ({ group }) => {
  group = GROUP_DATA[0];

  return (
    <>
      <ExpenseGroupInfoCard group={group}/>
      <ExpenseTabs/>
    </>
  );
};

export default Expense;
