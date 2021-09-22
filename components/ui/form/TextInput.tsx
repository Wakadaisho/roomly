import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon, MinusSmIcon } from "@heroicons/react/solid";
import { NextPage } from "next";
import React, { Fragment, SVGProps, useEffect, useState } from "react";
import { responsiveImage, ImageSize } from "@utils/images";

interface Props {
  title: string;
  value?: string | number;
  placeholder?: string;
  optional?: boolean;
  required?: boolean;
  onChange: any;
  onClick?: Function;
  number?: boolean;
}

const TextInput: NextPage<Props> = ({
  title,
  value,
  placeholder,
  optional,
  required,
  onChange,
  onClick,
  number,
}) => {
  //  className =
  //    "absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm";
  // className =
  //   "relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm";
  return (
    <div>
      <div className="flex pl-1 justify-between">
        <label className="block text-sm font-medium text-gray-700">
          {title}
        </label>
        {optional && <span className="text-sm text-gray-500">Optional</span>}
      </div>
      <div>
        <div className="w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75  focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
          <input
            type={number ? "number" : "text"}
            className="w-full focus:outline-none"
            placeholder={placeholder}
            required={required}
            onChange={onChange}
            defaultValue={value}
            onClick={() => onClick && onClick()}
          />
        </div>
      </div>
    </div>
  );
};

export default TextInput;
