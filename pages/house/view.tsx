import { useQuery, gql, DocumentNode } from "@apollo/client";
import { useState } from "react";

import MainLayout from "@layouts/mainLayout";

const HouseView = () => {
  return (
    <MainLayout user={{}} loading={false} pageTitle="House" subTitle="House">
      {/* <div className="m-15">
        <img src="/imgs/home.svg" alt="house" />
      </div> */}
      <p className="font-rubik">Hello world</p>
    </MainLayout>
  );
};

export default HouseView;
