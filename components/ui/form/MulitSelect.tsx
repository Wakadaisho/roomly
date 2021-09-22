import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, MinusSmIcon } from "@heroicons/react/solid";
import { NextPage } from "next";
import React, { Fragment, useEffect, useState } from "react";
import { responsiveImage, ImageSize } from "@utils/images";
import Tippy from "@tippyjs/react";

import { Multiselect } from "@styled-icons/fluentui-system-filled";
import {
  SelectAllOn,
  SelectAllOff,
} from "@styled-icons/fluentui-system-regular";

const MultiSelect: NextPage<Props> = ({
  value,
  onChange,
  options,
  title,
  optional,
  placeholder = "Select Items...",
  changeSelectedValues,
}) => {
  const [selectedValues, setSelectedValues] = useState<Option[]>([]);
  const [displayText, setDisplayText] = useState<Option>({
    name: placeholder,
    value: -1,
    icon: null,
  });

  const selectAll = () => {
    setSelectedValues([...options]);
  };

  const selectNone = () => {
    setSelectedValues([]);
  };

  useEffect(() => {
    // options.forEach((option: Option) => {
    //   if (option!.value === value) {
    //     setDisplayText(option);
    //     return;
    //   }
    // });
    // if (!value) {
    //   value = options[0].value;
    // }
  }, []);

  useEffect(() => {
    options.forEach((option: Option) => {
      if (option!.value === value) {
        if (valueIsSelected(value, selectedValues)) {
          setSelectedValues(removeValueFromArray(value, selectedValues));
        } else {
          setSelectedValues([...selectedValues, option]);
        }
      }
    });
  }, [value]);

  useEffect(() => {
    if (selectedValues.length) {
      setDisplayText(selectedValues[selectedValues.length - 1]);
      changeSelectedValues(selectedValues);
    } else {
      setDisplayText({ name: placeholder, value: -1, icon: null });
      changeSelectedValues([]);
    }
  }, [selectedValues]);

  return (
    <div>
      <div className="flex pl-1 justify-between">
        <label className="block text-sm font-medium text-gray-700">
          {title}
        </label>
        {optional && <span className="text-sm text-gray-500">Optional</span>}
      </div>
      <Listbox
        value={value}
        onChange={(v) => {
          if (valueIsSelected(v!, selectedValues)) {
            setSelectedValues(removeValueFromArray(v!, selectedValues));
          } else {
            setSelectedValues([
              ...selectedValues,
              getValueFromArray(v!, options)!,
            ]);
          }

          value = v;
        }}
      >
        {({ open }) => (
          <div className="relative mt-1 ">
            <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
              <span className="block truncate">
                <span className="flex ">
                  {displayText.icon ? (
                    <span className="mr-2">
                      <img
                        src={`${responsiveImage(
                          displayText.icon ?? null,
                          ImageSize.Thumbnail
                        )}`}
                        className="w-5 h-5"
                        alt=""
                        aria-hidden="true"
                      />
                    </span>
                  ) : (
                    <span className="mr-2">
                      <MinusSmIcon className="w-5 h-5" aria-hidden="true" />
                    </span>
                  )}
                  {displayText.name}{" "}
                  {selectedValues.length > 1
                    ? `(+${selectedValues.length - 1} more)`
                    : ""}
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <Multiselect
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
              <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
                <span className="flex justify-end space-x-1 mr-1">
                  <Tippy content={<span>Select All</span>}>
                    <SelectAllOn
                      className="w-5 h-5  text-gray-400 hover:text-pink-400 cursor-pointer"
                      onClick={selectAll}
                      aria-hidden="true"
                    />
                  </Tippy>
                  <Tippy content={<span>Select None</span>}>
                    <SelectAllOff
                      className="w-5 h-5 text-gray-400 hover:text-pink-400 hover:font-semibold cursor-pointer"
                      onClick={selectNone}
                      aria-hidden="true"
                    />
                  </Tippy>
                </span>
                {options.map((option: Option, optionIdx: number) => (
                  <Listbox.Option
                    key={optionIdx}
                    className={({ active, selected }) =>
                      `
                  ${
                    valueIsSelected(option.value, selectedValues)
                      ? "bg-pink-100 text-pink-900 "
                      : ""
                  }
                  ${active ? "bg-pink-200" : ""} 
                          cursor-default select-none relative py-2 pl-10 pr-4`
                    }
                    value={option.value}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`${
                            valueIsSelected(option.value, selectedValues)
                              ? "font-medium"
                              : "font-normal"
                          }  flex truncate justify-between`}
                        >
                          {option.name}

                          {valueIsSelected(option.value, selectedValues) ? (
                            <span className="text-pink-600">
                              <CheckIcon
                                className="w-5 h-5"
                                aria-hidden="true"
                              />
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
                                alt=""
                                aria-hidden="true"
                              />
                            </span>
                          ) : (
                            <span>
                              <MinusSmIcon
                                className="w-5 h-5"
                                aria-hidden="true"
                              />
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
        )}
      </Listbox>
    </div>
  );
};

export type Option = {
  name: string;
  value: string | number;
  icon?: string | null;
};

interface Props {
  value?: string | number;
  title: string;
  onChange: any;
  optional?: boolean;
  changeSelectedValues: Function;
  setSelectedValues?: Function;
  options: Option[];
  placeholder?: string;
}

const valueIsSelected = (value: string | number, array: Option[]) => {
  let valueFound = array.find((element) => element.value === value);
  return valueFound ? true : false;
};

const removeValueFromArray = (value: string | number, array: Option[]) => {
  return array.filter((element) => element.value !== value);
};

const getValueFromArray = (value: string | number, src: Option[]) => {
  let optionFound = src.find((element) => element.value === value);
  return optionFound;
};

export default MultiSelect;
