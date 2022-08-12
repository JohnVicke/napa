import { useSession } from "next-auth/react";
import React from "react";
import { Navbar } from "./Navbar";
import { SideMenu } from "./SideMenu";

export const Layout = ({ children }: React.PropsWithChildren<{}>) => {
  const { status } = useSession();
  return (
    <Navbar>
      {status === "authenticated" && <SideMenu />}
      <div className="mx-auto mt-24 flex w-full max-w-screen-xl flex-col justify-between pl-4 pr-4 lg:pl-56">
        {children}
      </div>
    </Navbar>
  );
};
