import { useRouter } from "next/router";

import nookies, { destroyCookie } from "nookies";

import AuthLayout from "@layouts/authLayout";
import axios from "axios";

const Logout = () => {
  // console.log("Destroying cookie");
  // destroyCookie(null, "jwt", { path: "/" });

  // const { push } = useRouter();

  // // push("/");

  return (
    <AuthLayout
      pageTitle="Logout"
      subTitle="Sign in to your account"
    ></AuthLayout>
  );
};

export async function getServerSideProps({ req, res }: any) {
  axios.get("/api/logout").catch(function (error) {
    console.log(error.message);
  });

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
}

export default Logout;
