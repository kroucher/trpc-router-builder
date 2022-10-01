import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>tRPC Router Builder</title>
        <meta name="description" content="Generate v10 tRPC routers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center bg-slate-900 py-2 text-white">
        <h1 className="text-6xl font-bold ">tRPC Router Builder</h1>

        <p className="mt-3 text-2xl">Generate v10 tRPC routers</p>

        <a
          href="/generator"
          className="mt-6 rounded bg-blue-500 px-4 py-2 text-white"
        >
          Get started
        </a>
      </main>
    </>
  );
};

export default Home;
