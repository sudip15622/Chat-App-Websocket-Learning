"use client";
import { SessionPayload } from "@/types/types";
import Link from "next/link";
import React from "react";
import { GiMagicHat } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import { logout } from "@/lib/actions";

interface NavbarProps {
  session: SessionPayload | null;
}

const Navbar = ({ session }: NavbarProps) => {
  const pages = [
    {
      name: "Chats",
      link: "/chats",
    },
    {
      name: "Groups",
      link: "/groups",
    },
    {
      name: "Requests",
      link: "/requests",
    },
    {
      name: "Settings",
      link: "/settings",
    },
  ];
  return (
    <div className="w-full px-4 py-6">
      <nav className="w-full max-w-7xl mx-auto flex items-center justify-between gap-x-10">
        <Link href={"/"} className="flex items-center gap-x-2">
          <span className="flex justify-center items-center p-2 bg-primary text-primary-foreground rounded-lg w-fit mx-auto text-xl">
            <GiMagicHat />
          </span>
          <span className="text-xl font-bold">Chat App</span>
        </Link>
        <div className="space-x-10">
          {pages.map((page, index) => {
            return (
              <Link key={index} href={page.link}>
                {page.name}
              </Link>
            );
          })}
        </div>
        {session ? (
          <div className="flex flex-row gap-x-5">
            <div className="flex items-center justify-center text-3xl">
              <FaUserCircle />
            </div>
            <button onClick={() => logout()} className="bg-destructive text-primary-foreground hover:bg-destructive/90 duration-200 transition-all ease-in-out rounded-xl px-4 py-2 outline-none border-none cursor-pointer">
              Logout
            </button>
          </div>
        ) : (
          <div className="space-x-5">
            <Link
              href={"/login"}
              className="bg-card text-card-foreground hover:bg-card/90 duration-200 transition-all ease-in-out rounded-xl px-4 py-2 outline-none border-1 border-border"
            >
              Login
            </Link>
            <Link
              href={"/login"}
              className="bg-primary text-primary-foreground hover:bg-primary/90 duration-200 transition-all ease-in-out rounded-xl px-4 py-2 outline-none"
            >
              Signup
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
