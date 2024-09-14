import {atom} from 'jotai';

const currentGroupMembers = [];

const paidUsers = [];
const participantShareList = [];
const defaultPaidUser= {
    userId: 0,
    userName: "Lisha",
    paidAmount:0.00
}

export const paidUsersAtom = atom(paidUsers);
export const participantShareListAtom = atom(participantShareList);
export const defaultPaidUserAtom = atom(defaultPaidUser);
export const totalExpenseAmountAtom = atom(100.00)
