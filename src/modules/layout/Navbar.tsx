import { AnimatePresence, motion } from "framer-motion";
import { Session } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import React from "react";
import { TextInput } from "../../components/TextInput";
import { SideMenuItems } from "./SideMenuItems";

const capitalize = (s: string) => `${s.charAt(0).toUpperCase()}${s.slice(1)}`;

const ToggleThemeButton = () => {
  const { theme, setTheme } = useTheme();
  const animation = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
    transition: { type: "spring", stiffness: 300, damping: 30 },
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="cursor-pointer pt-2 " onClick={toggleTheme}>
      <AnimatePresence exitBeforeEnter>
        {theme === "light" ? (
          <div className="flex items-center w-full justify-between">
            {capitalize(theme)}
            <motion.i
              className="ri-moon-fill ri-xl"
              key="moon"
              {...animation}
            />
          </div>
        ) : (
          <div className="flex items-center w-full justify-between">
            {capitalize(theme as "dark")}
            <motion.i className="ri-sun-fill ri-xl" key="sun" {...animation} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

type ProfileAvatarProps = {
  image?: string;
  name?: string;
};

const getInitials = (name?: string) => {
  if (!name) return "";
  const words = name.split(" ");
  const initials = words.map((word) => word[0]).join("");
  return initials;
};

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ image, name }) => {
  const sharedClassNames = "rounded-full w-10";
  if (!image) {
    return (
      <div className={`relative bg-base-300 ${sharedClassNames}`}>
        <p className="inset-center">{getInitials(name)}</p>
      </div>
    );
  }
  return <img className={`${sharedClassNames}`} src={image} />;
};

type ProfileMenuProps = {
  user: Session["user"];
};

const ProfileMenu: React.FC<ProfileMenuProps> = ({ user }) => {
  return (
    <div className="flex-none gap-2">
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle">
          <ProfileAvatar
            name={user?.name as string | undefined}
            image={user?.image as string | undefined}
          />
        </label>
        <ul
          tabIndex={0}
          className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-200 bg-opacity-90 backdrop-blur rounded-box w-52"
        >
          <li>
            <a>Profile</a>
          </li>
          <li className="full-w">
            <ToggleThemeButton />
          </li>
          <li>
            <a onClick={() => signOut()}>Logout</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export const Navbar: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data, status } = useSession();
  return (
    <div className="drawer h-fullpage ">
      <input id="navbar-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <nav
          className="
          fixed
border-b-2 border-base-200
  top-0 z-30 flex w-full justify-center bg-opacity-90 backdrop-blur bg-base-100 text-base-content"
        >
          <div className="navbar w-full p-0 m-0">
            <div className="ml-4 flex-none lg:hidden">
              <label
                htmlFor="navbar-drawer"
                className="btn btn-square btn-ghost"
              >
                <i className="ri-menu-4-line ri-xl" />
              </label>
            </div>
            <div className="w-52 lg:border-r-2 border-base-200 h-full justify-center">
              <div className="mr-6">
                <Link href="/">
                  <button className="btn btn-ghost font-bold text-md lg:text-xl cursor-pointer">
                    time-keeper
                  </button>
                </Link>
              </div>
            </div>
            <div className="gap-2 flex-1 justify-end mr-4">
              <div className="form-control relative hidden sm:block">
                <TextInput
                  type="text"
                  placeholder="Search"
                  containerSize="sm"
                  startIcon={<i className="ri-search-line ri-md" />}
                  endContent={
                    <>
                      <kbd className="kbd kbd-xs px-2">ctrl</kbd>+
                      <kbd className="kbd kbd-xs px-2">k</kbd>
                    </>
                  }
                />
              </div>
              {status === "authenticated" ? (
                <ProfileMenu user={data.user} />
              ) : (
                <button className="btn btn-primary" onClick={() => signIn()}>
                  sign in
                </button>
              )}
            </div>
          </div>
        </nav>
        <div>{children}</div>
      </div>
      <div className="drawer-side">
        <label htmlFor="navbar-drawer" className="drawer-overlay" />
        <div className="menu py-24 overflow-y-auto w-80 bg-base-100">
          <SideMenuItems />
        </div>
      </div>
    </div>
  );
};
