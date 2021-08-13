import { useQuery, gql, DocumentNode } from "@apollo/client";
import { useState } from "react";

import MainLayout from "@layouts/mainLayout";

const Home = () => {
  return (
    <MainLayout
      user={{}}
      loading={false}
      pageTitle="Home"
      subTitle="Find your new place"
    ></MainLayout>
  );
};

export default Home;
