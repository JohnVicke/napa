import React from "react";
import { getProviders, signIn } from "next-auth/react";
import type { GetServerSidePropsContext } from "next/types";
import { getAuthSession } from "../../utils/getAuthSession";
import { useRouter } from "next/router";

interface SigninProps {
  callbackUrl?: string;
}

const Signin = ({ callbackUrl }: SigninProps) => {
  return (
    <div className="hero min-h-screen">
      <div className="hero-content">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <div>Login with your fav provider</div>
            <button
              className="btn btn-primary"
              onClick={() =>
                signIn("google", {
                  callbackUrl: callbackUrl ? callbackUrl : "/",
                })
              }
            >
              Sign in with google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getAuthSession(ctx);
  const { callbackUrl } = ctx.query;

  if (session) {
    return {
      redirect: { destination: callbackUrl ? callbackUrl : "/" },
    };
  }
  return {
    props: {
      callbackUrl,
    },
  };
};
