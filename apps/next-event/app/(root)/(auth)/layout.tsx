import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signin/Signup",
  description: "Login to your account",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
