import { atom } from "jotai";

const loggedInUser = {
    userId:1,
    userName:"Lisha"
};
const isUserLoggedIn= true;
export const loggedInUserAtom = atom(loggedInUser)
export const isUserLoggedInAtom = atom(isUserLoggedIn)