import { unsealData } from "iron-session/edge";
import { cookies } from "next/headers";
import { COOKIE_NAME, COOKIE_SECRET, FormValues } from "./constants";

type sessionResults = () => Promise<FormValues | null>;

const sessionState: sessionResults = async () => {
  const cookieStore = cookies();
  const encryptedSession = cookieStore.get(COOKIE_NAME)?.value;
  const sessionState: FormValues | null = encryptedSession
    ? await JSON.parse(
        await unsealData(encryptedSession, {
          password: COOKIE_SECRET,
        })
      )
    : null;

  return sessionState;
};

export default sessionState;
