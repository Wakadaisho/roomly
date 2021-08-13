import { NextPage } from "next";
import Head from "next/head";

import Navbar from "./Navbar";

interface Props {
  user?: object;
  loading?: boolean;
  title: string;
  subTitle: string;
}

const Header: NextPage<Props> = ({ user, loading, title, subTitle }) => {
  return (
    <div>
      <Head>
        <title>{`${(title && title) || "Roomify"} ${
          subTitle ? " | " + subTitle : ""
        }`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!loading && user && <Navbar user={user} loading={loading} />}
    </div>
  );
};

export default Header;
