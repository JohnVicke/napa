import { Icon } from "@/components/icon/Icon";
import { AnimatePresence, motion } from "framer-motion";
import { Session } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import React from "react";
import { TextInput } from "../../components/TextInput";
import { SideMenuItems } from "./SideMenuItems";

const capitalize = (s: string) => `${s.charAt(0).toUpperCase()}${s.slice(1)}`;

const getInitials = (name?: string) => {
  if (!name) return "";
  const words = name.split(" ");
  const initials = words.map((word) => word[0]).join("");
  return initials;
};

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
          <div className="flex w-full items-center justify-between">
            {capitalize(theme)}
            <motion.div key="moon" {...animation}>
              <Icon icon="ri-moon-fill" size="xl" />
            </motion.div>
          </div>
        ) : (
          <div className="flex w-full items-center justify-between">
            {capitalize(theme as "dark")}
            <motion.div key="sun" {...animation}>
              <Icon icon="ri-sun-fill" size="xl" />
            </motion.div>
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
          className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-200 p-2 shadow"
        >
          <li>
            <a>Profile</a>
          </li>
          <li className="full-w">
            <ToggleThemeButton />
          </li>
          <li>
            <a onClick={() => signOut({ callbackUrl: "/" })}>Logout</a>
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
    <div className="h-fullpage drawer ">
      <input id="navbar-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <nav className="fixed top-0 z-30 flex w-full justify-center border-b-2 border-base-200 bg-base-100 bg-opacity-90 text-base-content backdrop-blur">
          <div className="navbar m-0 w-full p-0">
            <div className="ml-4 flex-none lg:hidden">
              <label
                htmlFor="navbar-drawer"
                className="btn btn-ghost btn-square"
              >
                <Icon icon="ri-menu-4-line" size="xl" />
              </label>
            </div>
            <div className="h-full w-52 justify-center border-base-200 lg:border-r-2">
              <div className="mr-6">
                <Link href="/">
                  <button className="text-md btn btn-ghost cursor-pointer font-bold lg:text-xl">
                    time-keeper
                  </button>
                </Link>
              </div>
            </div>
            <div className="mr-4 flex-1 justify-end gap-2">
              <div className="form-control relative hidden sm:block">
                <TextInput
                  name="search"
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
        <div className="menu w-80 overflow-y-auto bg-base-100 py-24">
          <SideMenuItems />
        </div>
      </div>
    </div>
  );
};
