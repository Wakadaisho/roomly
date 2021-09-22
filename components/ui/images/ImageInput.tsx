import { NextPage } from "next";
import { ImageAdd } from "@styled-icons/boxicons-regular";
import { useRef, useEffect, useState } from "react";
import Tippy from "@tippyjs/react";

const ImageInput: NextPage<Props> = ({ setImages }) => {
  const fileUploadControl = useRef<HTMLInputElement>(null);
  let tempImages: any[] = [];

  const addPictures = () => {
    Array.prototype.map.call(fileUploadControl!.current!.files, (file) =>
      tempImages.push(file)
    );
    setImages([...tempImages]);
  };

  useEffect(() => {
    fileUploadControl.current?.addEventListener("change", addPictures, false);
  }, []);

  const addImages = () => {
    fileUploadControl.current?.click();
  };

  return (
    <div className="relative w-20 h-24 bg-gray-200 border border-dashed border-black">
      <input
        type="file"
        accept="image/*"
        multiple
        capture="environment"
        hidden
        ref={fileUploadControl}
      ></input>
      <Tippy content={<span>Add images</span>}>
        <span
          onClick={addImages}
          className="absolute -bottom-3 -right-3 pl-0.5 bg-figma-orange hover:bg-figma-pink rounded-full "
        >
          <ImageAdd className=" w-5 h-5 text-white hover:font-semibold cursor-pointer" />
        </span>
      </Tippy>
    </div>
  );
};

interface Props {
  setImages: any;
}

export default ImageInput;
