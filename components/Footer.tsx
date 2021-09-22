import moment from "moment";
import { NextPage } from "next";

import {
  FacebookCircle,
  Twitter,
  Instagram,
} from "@styled-icons/boxicons-logos";

interface Props {}

const Footer: NextPage<Props> = () => {
  const year: number = moment().get("year");

  return (
    <>
      <footer
        className={`flex flex-col justify-between text-center text-xs lg:p-2 p-3 md:p-2 sm:p-0 mt-6 relative bottom-0 border-t border-gray-300 bg-gray-50 w-full text-gray-400`}
      >
        <div
          id="important-links"
          className="flex flex-row justify-evenly border-b-2 font-karla pb-10 text-left text-black"
        >
          <ul className="justify-between p-5">
            <li className="uppercase font-bold font-rubik">About</li>
            <li className="mt-2">
              <a href="#">How Roomly Works</a>
            </li>
            <li className="mt-2">
              <a href="#">Blog</a>
            </li>
            <li className="mt-2">
              <a href="#">Privacy Policy</a>
            </li>
            <li className="mt-2">
              <a href="#">Terms and Conditions</a>
            </li>
          </ul>

          <ul className="p-5">
            <li className="uppercase font-bold font-rubik">Community</li>
            <li className="mt-2">
              <a href="#">Coupons</a>
            </li>
            <li className="mt-2">
              <a href="#">Referrals</a>
            </li>
            <li className="mt-2">
              <a href="#">Accessibility</a>
            </li>
            <li className="mt-2">
              <a href="#">Diversity and Belonging</a>
            </li>
          </ul>
          <ul className="p-5">
            <li className="uppercase font-bold font-rubik">Host</li>
            <li className="mt-2">
              <a href="#">Host your home</a>
            </li>
          </ul>
          <ul className="p-5">
            <li className="uppercase font-bold font-rubik">Support</li>
            <li className="mt-2">
              <a href="#">Trust and Safety</a>
            </li>
            <li className="mt-2">
              <a href="#">Help Center</a>
            </li>
          </ul>
        </div>
        <div id="copyright" className="flex justify-around">
          <div className="my-auto">
            &copy; {moment().format("YYYY")} Roomly Inc All rights reserved
          </div>
          <div className="flex p-2 my-auto text-black">
            <a href="#" className="px-1">
              <span>
                <FacebookCircle className="w-5 h-auto" />
              </span>
            </a>
            <a href="#" className="px-1">
              <span>
                <Twitter className="w-5 h-auto" />
              </span>
            </a>
            <a href="#" className="px-1">
              <span>
                <Instagram className="w-5 h-auto" />
              </span>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
