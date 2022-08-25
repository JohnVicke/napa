import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import { signIn } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import landingImage from "public/images/landing-image.webp";
import { getAuthSession } from "../utils/getAuthSession";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>napa</title>
        <meta name="description" content="Keep track of time at the office" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="hero ">
          <div className="hero-content flex-col md:flex-row">
            <Image
              src={landingImage}
              objectFit="cover"
              height={2000}
              className="max-w-sm rounded-lg shadow-2xl"
              alt="hero image"
            />
            <div>
              <h1 className="text-4xl font-bold">
                Not Another Productivity App
              </h1>
              <div className="pt-5" />
              <p className="leading-relaxed tracking-wide">
                In order to deliver a good work-life balance, we track the
                amount of time you spend working throughout your
                workweek—whether it’s at an office or home on your laptop. It
                all adds up so you can plan for the upcoming week and make sure
                you have time to relax and play too, without worrying about how
                much time you allocated to each task.
              </p>
              <div className="py-6" />
              <button
                className="btn btn-primary float-left"
                onClick={() => signIn()}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
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
