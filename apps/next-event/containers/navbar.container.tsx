"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LogOut, Menu, X } from "lucide-react";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";

export default function Navbar() {
  const storeUser = JSON.parse(localStorage.getItem("user") as string);

  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token") as string;

    if (token) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  return (
    <nav>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center border-b border-gray-300">
        <Link href="/" className="text-2xl font-bold">
          Event App
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          {isLoggedIn ? (
            <div className="flex space-x-8 items-center">
              <Avatar>
                {/* <AvatarImage
                    className="rounded-full"
                    width={35}
                    height={35}
                    src="https://github.com/shadcn.png"
                  /> */}
                <AvatarFallback className="bg-blue-500 flex w-10 h-10 text-white items-center justify-center rounded-full">
                  {storeUser.name?.split(" ")[0]?.charAt(0)}
                  {storeUser.name?.split(" ")[1]?.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <LogOut className="cursor-pointer" size={28} onClick={logout} />
            </div>
          ) : (
            <Link href="/login" className="hover:text-gray-700">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-100 p-4 absolute top-[57px] left-0 right-0 bottom-[50%] z-50 border border-gray-300">
          <Link
            href="/"
            className="block py-2"
            onClick={() => setIsOpen(false)}
          >
            Events
          </Link>
        </div>
      )}
    </nav>
  );
}
