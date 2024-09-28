import { atom } from "jotai";

const currentGroupData = [];
const groupMembersData = [];

export const groupMembersAtom = atom(groupMembersData);
export const currentGroupDataAtom = atom(currentGroupData);
