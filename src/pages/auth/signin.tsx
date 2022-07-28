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
    <div className="flex justify-center pt-24">
      <div className="card flex-shrink-0 w-full max-w-sm bg-base-200">
        <div className="card-body">
          <div>
            Login with <span className="italic text-thin">(your fav)</span>{" "}
            provider
          </div>
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
