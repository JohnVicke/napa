import { useRouter } from "next/router";
import React from "react";
import { Navbar } from "./Navbar";
import { SideMenu } from "./SideMenu";

export const Layout = ({ children }: React.PropsWithChildren<{}>) => {
  const router = useRouter();
  return (
    <>
      <Navbar>
        {router.pathname !== "/" && <SideMenu />}
        <div className="mt-24 pl-4 lg:pl-56 pr-4 max-w-screen-lg w-full mx-auto flex flex-col justify-between">
          {children}
        </div>
      </Navbar>
    </>
  );
};