import Image from "next/image";
// import heroHouse from "/imgs/icons/house.png";

import MainLayout from "@layouts/mainLayout";

const Home = () => {
  return (
    <MainLayout
      user={{}}
      loading={false}
      pageTitle="Home"
      subTitle="Find your new place"
    >
      <div id="hero-wrapper" className="relative min-h-full -mt-4 mb-4">
        <div
          id="hero-foreground"
          className="flex flex-col pt-14 md:flex-row justify-evenly items-center z-20"
        >
          <div className="flex flex-col">
            <span className="text-4xl font-bold">
              Lorem ipsum dolor sit amet, consectetur adipiscing
            </span>
            <span className="text-4xl font-bold">
              Lorem ipsum dolor sit amet, consectetur adipiscing
            </span>
            <button type="button">Action</button>
          </div>
          <div className="w-1/2 self-center">
            <img src="/imgs/home.svg" className="mx-auto" alt="hero_house" />
            {/* <Image src={"/imgs/home.svg"} width="100vh" height="auto"></Image> */}
          </div>
        </div>
        <div
          id="hero-background"
          className="absolute top-0 left-0 -z-10 w-full h-full overflow-hidden"
        >
          <div className="relative w-full h-full">
            <div className="absolute -top-40 -left-80 w-112 h-112 from-figma-orange filter blur-3xl rounded-full  bg-gradient-to-br"></div>
            <div className="absolute -bottom-80 -right-56 w-112 h-112  filter  bg-gradient-to-b from-figma-orange to-figma-gray blur-xl rounded-full opacity-40"></div>
          </div>
        </div>
      </div>

      <div id="explore-nearby" className="flex justify-start">
        <h3 className="font-rubik text-3xl">Explore Nearby</h3>
        <div>Hello</div>
      </div>
      <div id="top-views"></div>
      <div id="list-your-house"></div>
      <div id="testimonials"></div>
      <div id=""></div>
    </MainLayout>
  );
};

export default Home;
