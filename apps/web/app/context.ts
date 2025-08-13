import type { Session } from "@repo/auth";
import { unstable_createContext } from "react-router";

export const userContext = unstable_createContext<Session>();
