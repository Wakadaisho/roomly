import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon, MinusSmIcon } from "@heroicons/react/solid";
import { NextPage } from "next";
import React, { Fragment, SVGProps, useEffect, useState } from "react";
import { responsiveImage, ImageSize } from "@utils/images";

export type Option = {
  name: String;
  value: String | number;
  icon?: String;
};

interface Props {
  selectedOption: String | number;
  setSelected: (value: String | number) => void;
  options: Option[];
}

const Select: NextPage<Props> = ({ selectedOption, setSelected, options }) => {
  const [displayText, setDisplayText] = useState<Option>(options[0]);

  useEffect(() => {
    options.forEach((option: Option) => {
      if (option!.value === selectedOption) {
        setDisplayText(option);
      }
    });
  }, []);

  useEffect(() => {
    options.forEach((option: Option) => {
      if (option!.value === selectedOption) {
        setDisplayText(option);
      }
    });
  }, [selectedOption]);

  return (
    <Listbox horizontal={true} value={selectedOption} onChange={setSelected}>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
          <span className="block truncate">
            <span className="flex">
              {displayText.icon ? (
                <span className="mr-2">
                  <img
                    src={`${responsiveImage(
                      displayText.icon ?? null,
                      ImageSize.Thumbnail
                    )}`}
                    className="w-5 h-5"
                    alt="house_icon"
                    aria-hidden="true"
                  />
                </span>
              ) : (
                <span className="mr-2">
                  <MinusSmIcon className="w-5 h-5" aria-hidden="true" />
                </span>
              )}
              {displayText.name}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options.map((option: Option, optionIdx: number) => (
              <Listbox.Option
                key={optionIdx}
                className={({ active }) =>
                  `${active ? "text-pink-900 bg-pink-100" : "text-gray-900"}
                          cursor-default select-none relative py-2 pl-10 pr-4`
                }
                value={option.value}
              >
                {({ selected, active }) => (
                  <>
                    <span
                      className={`${
                        selected ? "font-medium" : "font-normal"
                      }  flex truncate justify-between`}
                    >
                      {option.name}

                      {selected ? (
                        <span
                          className={`${
                            active ? "text-pink-800" : "text-pink-600"
                          }`}
                        >
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </span>
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      {option.icon ? (
                        <span>
                          <img
                            src={`${responsiveImage(
                              option.icon ?? null,
                              ImageSize.Thumbnail
                            )}`}
                            className="w-5 h-5"
                            alt="house_icon"
                            aria-hidden="true"
                          />
                        </span>
                      ) : (
                        <span>
                          <MinusSmIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      )}
                    </span>
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default Select;
