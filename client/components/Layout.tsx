import Head from "next/head";
import React from "react";
import Col from "./Col";

interface ILayout {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayout) => {
  return (
    <>
      <Col>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="overflow-x-hidden flex-grow flex flex-col">
          {children}
        </main>
      </Col>
    </>
  );
};

export default Layout;
