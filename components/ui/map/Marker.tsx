import { NextPage } from "next";
import React, { Fragment, SVGProps, useEffect, useState } from "react";
import { CurrentLocation } from "@styled-icons/boxicons-regular";

interface Props {
  lat: number;
  lng: number;
  text: string;

  icon?: any;
}

const Marker: NextPage<Props> = ({ lat, lng, text, icon }) => {
  return (
    <div>
      <CurrentLocation />
    </div>
  );
};

export default Marker;
