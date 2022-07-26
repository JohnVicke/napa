import type { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";
import Head from "next/head";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const session = useSession();
  const hello = trpc.useQuery(["example.hello", { text: "from time keeper" }]);

  return (
    <>
      <Head>
        <title>Time keeper</title>
        <meta name="description" content="Keep track of time at the office" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center h-screen p-4">
        {!hello.isLoading && hello?.data && <h1>{hello.data.greeting}</h1>}
        {session.status === "loading" ||
          (session.status === "unauthenticated" ? (
            <button
              onClick={() => signIn(undefined, { callbackUrl: "/profile" })}
              className="btn btn-primary"
            >
              Sign in
            </button>
          ) : (
            <>
              <div>Welcome back {session.data?.user?.name}</div>
              <button
                className="btn btn-primary"
                onClick={() => signOut({ callbackUrl: "/loggedout" })}
              >
                Sign out
              </button>
            </>
          ))}
      </main>
    </>
  );
};

export default Home;
