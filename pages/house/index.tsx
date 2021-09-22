import { useQuery, gql, TypedDocumentNode } from "@apollo/client";
import { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";

import Marker from "@components/ui/map/Marker";
import Map from "@components/Map";
import MainLayout from "@layouts/mainLayout";
import { HomeIcon } from "@heroicons/react/solid";

const HouseListings = () => {
  const [options, setOptions] = useState<{
    center: { lat: number; lng: number };
    zoom: number;
  }>({ center: { lat: 15, lng: 15 }, zoom: 2 });

  const users = useQuery(GET_USERS, {
    variables: {
      id: 1,
    },
  });

  useEffect(() => {
    setOptions({
      center: {
        lat: -1.28498,
        lng: 36.82589,
      },
      zoom: 15,
    });
    // console.log("Set options");
  }, []);

  useEffect(() => {
    // console.log(users.data);
  }, [users]);

  return (
    <MainLayout
      user={{}}
      loading={false}
      pageTitle="Listings"
      subTitle="Houses in your area"
    >
      <Map
        mapOptions={options}
        apiKey="AIzaSyDBTDiyc8UndfMRRdOPcC-XCpAXwAvVqIA"
      >
        <Marker lat={-1.220436} lng={36.857229} text="My Marker 1" />
        <Marker lat={-1.221437} lng={36.85823} text="My Marker 1" />
        <Marker lat={-1.28495} lng={36.82585} text="My Marker 2" />
      </Map>

      <Map
        mapOptions={options}
        apiKey="AIzaSyDBTDiyc8UndfMRRdOPcC-XCpAXwAvVqIA"
        id={1}
      >
        <Marker lat={-1.220436} lng={36.857229} text="My Marker 1" />
        <Marker lat={-1.221437} lng={36.85823} text="My Marker 1" />
        <Marker lat={-1.28495} lng={36.82585} text="My Marker 2" />
      </Map>
      {/* <div className="p-2 w-96 h-96 sm:w-120 sm:h-120 md:w-120 md:h-120 lg:h-140 lg:w-140 xl:w-160 xl:h-160 rounded-lg">
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDBTDiyc8UndfMRRdOPcC-XCpAXwAvVqIA" }}
          defaultCenter={options.center}
          defaultZoom={options.zoom}
        >
          <Marker lat={-1.220436} lng={36.857229} text="My Marker 1" />
          <Marker lat={-1.221437} lng={36.85823} text="My Marker 1" />
          <Marker lat={-1.28495} lng={36.82585} text="My Marker 2" />
        </GoogleMapReact>
      </div>
      <div className="p-2 w-96 h-96 sm:w-120 sm:h-120 md:w-120 md:h-120 lg:h-140 lg:w-140 xl:w-160 xl:h-160 rounded-lg">
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDBTDiyc8UndfMRRdOPcC-XCpAXwAvVqIA" }}
          defaultCenter={options.center}
          defaultZoom={options.zoom}
        >
          <Marker lat={-1.220436} lng={36.857229} text="My Marker 1" />
          <Marker lat={-1.221437} lng={36.85823} text="My Marker 1" />
          <Marker lat={-1.28495} lng={36.82585} text="My Marker 2" />
        </GoogleMapReact>
      </div> */}
      {/* </div> */}
      {/* <div style={{ height: "50vh", width: "50vh" }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyDBTDiyc8UndfMRRdOPcC-XCpAXwAvVqIA",
            libraries: ["places"],
          }}
          defaultCenter={options.center}
          defaultZoom={options.zoom}
          mapIds
          yesIWantToUseGoogleMapApiInternals
        >
          <Marker lat={-1.28498} lng={36.82589} text="My Marker" mapSize={50} />
        </GoogleMapReact>
      </div> */}
    </MainLayout>
  );
};

const GET_USERS: TypedDocumentNode = gql`
  query GetUserById($id: ID!) {
    user(id: $id) {
      username
      email
    }
  }
`;

export default HouseListings;
