"use server";

import { cookies } from "next/headers";

import api from "./api";

export const login = async (formState: any, formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  console.log(email, password, formData, formState);

  try {
    const cookieStore = await cookies();
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    console.log(response?.data?.data?.accessToken);
    // localStorage.setItem("token", response?.data?.data?.accessToken);
    // localStorage.setItem("user", JSON.stringify(response?.data?.data));

    cookieStore.set("token", response?.data?.data?.accessToken, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      // maxAge: 60 * 60 * 24 * 30,
      // domain: process.env.NEXT_PUBLIC_DOMAIN,
    });
    cookieStore.set("user", response?.data?.data, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return response.data;
  } catch (error: any) {
    console.log(error);
    return {
      statusCode: 400,
      message: "Wrong email or password",
      status: "error",
    };
  }
};
