import { HelpCircle } from "@styled-icons/boxicons-regular";
import { NextPage } from "next";

interface Props {
  title: string;
  description: string;
  icon: string;
  link: string;
}
const ProfileCard: NextPage<Props> = ({ title, description, icon, link }) => {
  return (
    <div className="flex flex-col w-128 justify-start space-y-5 py-5 px-10 shadow-md border-2 border-t-0">
      <div id="card-icon" className="w-5 h-5">
        <HelpCircle className="w-full" />
      </div>
      <div id="card-title">Title</div>
      <div id="card-description">The card's description</div>
    </div>
  );
};

export default ProfileCard;
