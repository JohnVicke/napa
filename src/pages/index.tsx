import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Time keeper</title>
        <meta name="description" content="Keep track of time at the office" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="hero max-h-full pt-24">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src="https://placeimg.com/260/400/arch"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">Time keeper</h1>
            <p className="py-6">
              The idea sprang from a desire to keep track of time at the office.
              Usually this is done by a spreadsheet or a spreadsheet app. But
              with time-keeper, you can keep track of time in the browser.
              <br />
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
