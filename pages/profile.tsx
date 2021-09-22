import ProfileCard from "@components/ui/ProfileCard";
import MainLayout from "@layouts/mainLayout";

const Home = () => {
  return (
    <MainLayout
      user={{}}
      loading={false}
      pageTitle="Home"
      subTitle="Find your new place"
    >
      <div id="salutation"></div>
      <div id="personal" className="flex justify-between flex-wrap">
        <ProfileCard title="" icon="" description="" link="" />

        <ProfileCard title="" icon="" description="" link="" />

        <ProfileCard title="" icon="" description="" link="" />
      </div>
      <div id="hosting"></div>
      <div id="support"></div>
    </MainLayout>
  );
};

export default Home;
