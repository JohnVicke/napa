import React from "react";
import { Navbar } from "./Navbar";

const Footer: React.FC<{}> = () => {
  return (
    <div className="h-40">
      <div className="divider" />
      <div className="text-center text-xl font-bold">hello world</div>
    </div>
  );
};
export const Layout = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <>
      <Navbar>
        <div className="mt-24 " />
        <div className="px-4 max-w-screen-lg w-full mx-auto">{children}</div>
      </Navbar>
      <Footer />
    </>
  );
};
