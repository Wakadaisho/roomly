import { NextPage } from "next";
import Head from "next/head";
import { ReactNode } from "react";
import { Menu } from "@headlessui/react";

import Footer from "@components/Footer";

interface Props {
  pageTitle: string;
  subTitle: string;
  children?: ReactNode;
}

const AuthLayout: NextPage<Props> = ({ pageTitle, subTitle, children }) => {
  return (
    <>
      <Head>
        <title>{`${(pageTitle && pageTitle) || "Roomify"} ${
          subTitle ? " | " + subTitle : ""
        }`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col min-h-screen justify-between bg-white">
        <Menu
          as="div"
          className="flex w-full top-0 justify-between align-middle px-3 py-2 mb-1 bg-gray-50 rounded-md shadow-md"
        >
          <a href="/">
            <img src="/favicon.ico" alt="image" className="h-12 w-auto" />
          </a>
        </Menu>

        <div className={`flex-grow sm:max-w-full lg:m-5 md:m-5 sm:m-0`}>
          <div className="max-w-9xl mx-auto my-4">{children}</div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default AuthLayout;
