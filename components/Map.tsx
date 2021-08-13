import { NextPage } from "next";
import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useState } from "react";

type Props = {
  apiKey: string;
  mapOptions?: { center: { lat: number; lng: number }; zoom: number };
};

const Map: NextPage<Props> = ({ apiKey, mapOptions }) => {
  const [style, setStyle] = useState(mapStyle);
  const [map, setMap] = useState<google.maps.Map>();

  const [markers, setMarkers] = useState<google.maps.Marker>();
  const [loader, setLoader] = useState<Loader>();

  useEffect(() => {
    if (!loader) {
      setLoader(
        new Loader({
          apiKey: apiKey,
          version: "weekly",
          libraries: ["places"],
        })
      );
    }
  }, []);

  useEffect(() => {
    if (loader) {
      loader.load().then(() => {
        setMap(
          new google.maps.Map(document.getElementById("map")!, {
            ...mapOptions,
            mapId: "839149427cb3fff7",
          })
        );
      });
    }
  }, [loader]);

  useEffect(() => {
    if (map) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            map.setCenter(pos);
          },
          () => {
            console.log("error");
          }
        );
      }
    }
  }, [map]);

  return <div className="h-screen w-screen" id="map"></div>;
};

let mapStyle = [
  {
    featureType: "all",
    elementType: "all",
    stylers: [
      {
        hue: "#e7ecf0",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "all",
    stylers: [
      {
        saturation: -70,
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "all",
    stylers: [
      {
        visibility: "simplified",
      },
      {
        saturation: -60,
      },
    ],
  },
];

export default Map;
