import { GetServerSidePropsContext } from "next";
import { unstable_getServerSession as getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";

export const getAuthSession = ({ req, res }: GetServerSidePropsContext) =>
  getServerSession(req, res, authOptions);
