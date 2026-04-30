"use client";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { usePathname } from "next/navigation";
import React from "react";

const noNavRoutes = ["/login", "/register"];

const ConditionalLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const showNav = !noNavRoutes.includes(pathname);
  return (
    <>
      {showNav && <Navbar />}
      {children}
      {showNav && <Footer />}
    </>
  );
};

export default ConditionalLayout;
