import { useQuery, gql, TypedDocumentNode } from "@apollo/client";
import { useState, useEffect } from "react";

import Map from "@components/Map";
import MainLayout from "@layouts/mainLayout";

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
    console.log("Set options");
  }, []);

  useEffect(() => {
    console.log(users.data);
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
      ></Map>
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
