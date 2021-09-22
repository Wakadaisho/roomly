import { NextPage } from "next";
import { ImageAdd } from "@styled-icons/boxicons-regular";
import { useRef, useEffect } from "react";

const ImagePreview: NextPage<Props> = ({ images }) => {
  return (
    <div className="flex">
      {images &&
        images.map((image: any, index: number) => {
          return (
            <div className="w-20 h-24 bg-gray-200 border border-dashed border-black">
              <img src={image} alt={`image_${index}`} />
            </div>
          );
        })}
    </div>
  );
};

interface Props {
  images: any;
}

export default ImagePreview;
