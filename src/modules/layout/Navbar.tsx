import { AnimatePresence, motion } from "framer-motion";
import { Session } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import React from "react";

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
    <div className="pointer-cursor pt-1" onClick={toggleTheme}>
      <AnimatePresence exitBeforeEnter>
        {theme === "light" ? (
          <motion.i className="ri-moon-fill ri-xl" key="moon" {...animation} />
        ) : (
          <motion.i className="ri-sun-fill ri-xl" key="sun" {...animation} />
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
          <li>
            <a>Settings</a>
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
    <div className="drawer">
      <input id="navbar-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <nav
          className="
  sticky top-0 z-30 flex w-full justify-center bg-opacity-90 backdrop-blur bg-base-200 text-base-content shadow-sm"
        >
          <div className="navbar w-full">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="navbar-drawer"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="flex-1">
              <div className="mr-6">
                <Link href="/">
                  <button className="btn btn-ghost font-bold text-md lg:text-xl cursor-pointer">
                    time-keeper
                  </button>
                </Link>
              </div>
              <div className="form-control relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search"
                  className="input input-bordered w-64 lg:w-80 "
                />
                <div className="absolute top-3 right-8 gap-1 hidden lg:flex">
                  <kbd className="kbd kbd-sm px-2">ctrl</kbd>+
                  <kbd className="kbd kbd-sm px-2">k</kbd>
                </div>
              </div>
            </div>
            <div className="flex-none gap-2">
              <ToggleThemeButton />
              <div className="pr-2" />
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
        {children}
      </div>
      <div className="drawer-side">
        <label htmlFor="navbar-drawer" className="drawer-overlay" />
        <ul className="menu p-4 overflow-y-auto w-80 bg-base-100">
          <li>
            <a>Sidebar Item 1</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
