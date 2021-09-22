import { NextPage } from "next";
import { ReactNode } from "react";
import Footer from "@components/Footer";
import Header from "@components/Header";

interface Props {
  user?: object;
  loading?: boolean;
  pageTitle: string;
  subTitle: string;
  children?: ReactNode;
}

const MainLayout: NextPage<Props> = ({
  user,
  loading,
  pageTitle,
  subTitle,
  children,
}) => {
  return (
    <div className="flex flex-col min-h-screen justify-between bg-white">
      <Header
        user={user}
        loading={loading}
        title={pageTitle}
        subTitle={subTitle}
      />

      {/* {children} */}
      <div className={`flex-grow sm:max-w-full  overflow-hidden`}>
        <div className="max-w-9xl mx-auto my-4">{children}</div>
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
