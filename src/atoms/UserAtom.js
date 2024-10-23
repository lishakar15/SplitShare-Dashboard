import { atom } from "jotai";

const userData = localStorage.getItem("userData");
export const loggedInUserAtom = atom(userData ? JSON.parse(userData) : null);
export const isUserLoggedInAtom = atom((get) => !!get(loggedInUserAtom));