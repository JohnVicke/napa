import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.useQuery(["example.hello", { text: "from time keeper" }]);

  return (
    <>
      <Head>
        <title>Time keeper</title>
        <meta name="description" content="Keep track of time at the office" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center h-full p-4">
        {!hello.isLoading && hello?.data && <h1>{hello.data.greeting}</h1>}

        <div className="card"></div>
      </main>
    </>
  );
};

export default Home;
