import { Resend } from "resend";

import { emailEnv } from "./env";

export const resend = new Resend(emailEnv().RESEND_API_KEY);
