import type { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import Head from "next/head";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const session = useSession();
  const hello = trpc.useQuery(["example.hello", { text: "from time keeper" }]);
  const test = trpc.useQuery(["example.getAll"]);
  const { mutate } = trpc.useMutation(["example.createTest"]);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <>
      <Head>
        <title>Time keeper</title>
        <meta name="description" content="Keep track of time at the office" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center h-screen p-4">
        {!hello.isLoading && hello?.data && <h1>{hello.data.greeting}</h1>}
        <button onClick={toggleTheme} className="btn btn-ghost">
          change colortheme
        </button>
        {session.status === "loading" ||
          (session.status === "unauthenticated" ? (
            <button onClick={() => signIn()} className="btn btn-primary">
              Sign in
            </button>
          ) : (
            <>
              <div>Welcome back {session.data?.user?.name}</div>
              <button className="btn btn-primary" onClick={() => signOut()}>
                Sign out
              </button>
            </>
          ))}
        <div className="mt-6" />
        <button
          className="btn btn-primary"
          onClick={() => mutate({ text: "hello world" })}
        >
          add thingy
        </button>
        <h1 className="text-center pt-6">{JSON.stringify(test.data)}</h1>
        <div className="card"></div>
      </main>
    </>
  );
};

export default Home;
