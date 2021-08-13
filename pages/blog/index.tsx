import { gql, DocumentNode } from "@apollo/client";

import MainLayout from "@layouts/mainLayout";

const BlogHome = () => {
  return (
    <MainLayout
      user={{}}
      loading={false}
      pageTitle="Listings"
      subTitle="Houses in your area"
    >
      {/* <div className="m-15">
        <img src="/imgs/home.svg" alt="house" />
      </div> */}
      <p className="font-rubik">Hello world</p>
    </MainLayout>
  );
};

export default BlogHome;
