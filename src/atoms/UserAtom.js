import { atom } from "jotai";

const userData = localStorage.getItem("userData");
// Atom to store user data from localStorage
export const loggedInUserAtom = atom(userData ? JSON.parse(userData) : null);

// Atom to check if the user is logged in
export const isUserLoggedInAtom = atom((get) => !!get(loggedInUserAtom));