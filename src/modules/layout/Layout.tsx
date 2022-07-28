import React from "react";
import { Navbar } from "./Navbar";
import { SideMenu } from "./SideMenu";

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
        <SideMenu />
        <div className="mt-24 pl-4 lg:pl-56 pr-4 max-w-screen-lg w-full mx-auto flex flex-col justify-between">
          {children}
        </div>
      </Navbar>
    </>
  );
};
