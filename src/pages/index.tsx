import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import { getAuthSession } from "../utils/getAuthSession";
import { signIn } from "next-auth/react";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>napa</title>
        <meta name="description" content="Keep track of time at the office" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-5xl font-bold">napa</h1>
        <div className="py-6" />
        <button
          className="btn btn-primary float-right lg:float-left"
          onClick={() => signIn()}
        >
          Get Started
        </button>
      </main>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getAuthSession(ctx);

  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
      props: { from: ctx.req.url },
    };
  }
  return { props: {} };
};
