import { NextPage } from "next";
import Link from "next/link";
import { Menu } from "@headlessui/react";
import {
  MenuIcon,
  HomeIcon,
  UserIcon,
  QuestionMarkCircleIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import { useState } from "react";

import Searchbar from "./Searchbar";
import SlideOver from "./SlideOver";

interface Props {
  user?: object;
  loading?: boolean;
}

const Navbar: NextPage<Props> = ({ user, loading }) => {
  const [open, setOpen] = useState(false);
  const [navigation] = useState([
    { name: "Home", href: "#", icon: HomeIcon },
    { name: "Profile", href: "#", icon: UserIcon },
    { name: "About", href: "#", icon: QuestionMarkCircleIcon },
    { name: "Log out", href: "/logout", icon: LogoutIcon },
  ]);

  console.log(user);
  return (
    <Menu
      as="div"
      className="flex w-full top-0 justify-between align-middle px-3 py-2 mb-1 bg-gray-50 rounded-md shadow-md"
    >
      <a href="/">
        <img src="/favicon.ico" alt="image" className="h-12 w-auto" />
      </a>

      <div className="w-5/6 sm:w-4/6 flex justify-center  px-2 align-center">
        <Searchbar />
      </div>

      <div className="md:hidden">
        <SlideOver navigation={navigation} open={open} setOpen={setOpen} />
      </div>
      <Menu.Button className="hidden md:block bg-figma-blue rounded-full px-5 py-2 text-gray-300  hover:text-white  ">
        Become a host
      </Menu.Button>
      <Menu.Button className="p-3">
        <MenuIcon onClick={() => setOpen(true)} className="h-5 w-5" />
      </Menu.Button>
    </Menu>
  );
};

export default Navbar;
