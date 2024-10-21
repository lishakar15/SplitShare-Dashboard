import { atom } from "jotai";
import { useRef } from "react";

const currentGroupMembers = [];

const paidUsers = [];
const participantShareList = [];
const defaultPaidUser = null;

export const paidUsersAtom = atom(paidUsers);
export const participantShareListAtom = atom(participantShareList);
export const defaultPaidUserAtom = atom(defaultPaidUser);
export const totalExpenseAmountAtom = atom(0);
export const splitTypeAtom = atom("EQUAL");
export const settleButtonRefAtom = atom(null);



