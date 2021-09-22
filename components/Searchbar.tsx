import { NextPage } from "next";

import { SearchIcon } from "@heroicons/react/outline";

const Searchbar: NextPage = () => {
  return (
    <>
      <div className="w-full flex justify-between align-center bg-figma-gray rounded-full focus-within:ring-2 focus-within:ring-figma-blue focus-within:border-transparent">
        <input
          type="text"
          className="w-full bg-figma-gray px-3 text-black flex-auto rounded-full outline-none placeholder-gray-400 "
          placeholder="Search house e.g. 1 bedroom"
        />
        <div className="self-center">
          <SearchIcon className="w-7 h-7 p-0.5  mx-2 bg-white rounded-full text-figma-orange hover:text-figma-blue  cursor-pointer" />
        </div>
      </div>
    </>
  );
};

export default Searchbar;
