import { NextPage } from "next";
import Link from "next/link";
import { Transition, Dialog } from "@headlessui/react";
import {
  XIcon,
  // HomeIcon,
  // UserIcon,
  // QuestionMarkCircleIcon,
  // LogoutIcon,
} from "@heroicons/react/outline";
import { Fragment, SVGProps } from "react";

import Searchbar from "./Searchbar";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  navigation: {
    name: string;
    href: string;
    icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  }[];
}

const SlideOver: NextPage<Props> = ({ open, setOpen, navigation }) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed inset-0 overflow-hidden"
        open={open}
        onClose={setOpen}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="relative w-screen max-w-md">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-500"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-500"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
                    <button
                      className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close panel</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                  <div className="px-4 sm:px-6">
                    <Dialog.Title className="text-lg font-medium text-gray-900">
                      Roomify
                    </Dialog.Title>
                  </div>
                  <div className="mt-6 relative flex-1 px-4 sm:px-6">
                    <ul>
                      {navigation &&
                        navigation.map((item) => (
                          <li
                            key={item.name}
                            className="group py-1 border-b-2 hover:border-figma-orange hover:bg-gray-100"
                          >
                            <Link
                              href={{
                                pathname: item.href,
                              }}
                            >
                              <a className="inline-block w-full text-gray-600 opacity-75 group-hover:text-figma-orange">
                                <item.icon
                                  className="text-gray-400 mr-3 flex-shrink-0 h-6 w-6 inline-block group-hover:text-figma-orange hover:h-8  hover:w-8"
                                  aria-hidden="true"
                                />
                                {item.name}
                              </a>
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SlideOver;
