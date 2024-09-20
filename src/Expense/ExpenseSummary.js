import * as React from "react";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function ExpenseSummary({ expense }) {
  const [users, setUsers] = useState([]);
  const paidUsersList = expense.paidUsers;
  const participantShareList = expense.participantShareList;

  useEffect(() => {
    const allUsers = [
      ...paidUsersList.map((paidUser) => ({
        userId: paidUser.userId,
        userName: paidUser.userName,
      })),
      ...participantShareList.map((participant) => ({
        userId: participant.userId,
        userName: participant.userName,
      })),
    ];
    const uniqueUsersMap = new Map();
    allUsers.forEach((user) => uniqueUsersMap.set(user.userId,user));
    setUsers([...uniqueUsersMap.values()]);
  }, []);

  const getUserPaidAmount = (userId) => {
    const paidUser = paidUsersList.find((user) => user.userId === userId);
    return paidUser ? paidUser.paidAmount : 0;
  };
  const getUserShareAmount = (userId) => {
    const participant = participantShareList.find((user) => user.userId === userId);
    return participant ? participant.shareAmount : 0;
  };
  const calculateUserBalance = (userId) => {
    return getUserPaidAmount(userId) - getUserShareAmount(userId);
  };
  return (
    <TableContainer component={Paper}>
      <Table aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell>Users</TableCell>
            <TableCell align="right">Paid</TableCell>
            <TableCell align="right">Owed</TableCell>
            <TableCell align="right">Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.userId}>
              <TableCell>{user.userName}</TableCell>
              <TableCell align="right">₹{getUserPaidAmount(user.userId).toFixed(2)}</TableCell>
              <TableCell align="right">₹{getUserShareAmount(user.userId).toFixed(2)}</TableCell>
              <TableCell align="right">₹{calculateUserBalance(user.userId).toFixed(2)}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell align="right" colSpan={2}>
              Total
            </TableCell>
            <TableCell align="right">₹{expense.totalAmount.toFixed(2)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
