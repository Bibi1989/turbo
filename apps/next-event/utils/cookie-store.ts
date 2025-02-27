import { cookies } from "next/headers";

export const cookieGet = async (key: string) => {
  const cookieStore = await cookies();
  return cookieStore.get(key)?.value;
};

export const cookieSet = async (key: string, value: string) => {
  const cookieStore = await cookies();
  cookieStore.set(key, value, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
};
