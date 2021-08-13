import { useMutation, gql, TypedDocumentNode } from "@apollo/client";
import axios from "axios";
import { print } from "graphql";
import { GetStaticProps, GetStaticPropsContext } from "next";
import nookies from "nookies";
import MainLayout from "@layouts/mainLayout";
import Select, { Option } from "@components/ui/form/Select";

import { useForm } from "react-hook-form";
import { useState, useRef } from "react";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/outline";
import { NextPage, NextPageContext } from "next";

interface Props {
  houseTypes: Option[];
}

const HouseCreate: NextPage<Props> = ({ houseTypes }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IFormInput>();
  const [addHouse, { data, loading, error }] = useMutation(ADD_HOUSE);
  const [houseOptions, setHouseOptions] = useState<Option[]>(houseTypes);
  const [houseType, setHouseType] = useState<String | number>(
    houseOptions[0].value
  );

  const onSubmit = handleSubmit((formData) => {
    addHouse({ variables: { house: formData } });
  });

  return (
    <MainLayout
      user={{}}
      loading={false}
      pageTitle="Add House"
      subTitle="Host your house"
    >
      <div className="flex justify-start p-4 font-rubik font-">
        <form className="space-y-6" onSubmit={onSubmit}>
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-semibold text-gray-700"
            >
              Where's your place located?
            </label>
            <div className="mt-1">
              <input
                id="location"
                type="text"
                required
                placeholder="Click to place pin on map"
                {...register("location")}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="type"
              className="block text-sm font-semibold text-gray-700"
            >
              Select the type of house
            </label>
            <Select
              selectedOption={houseType}
              setSelected={setHouseType}
              options={houseOptions}
            />
          </div>

          <div>
            <label
              htmlFor="location"
              className="block text-sm font-semibold text-gray-700"
            >
              How much are you charging?
            </label>
            <div className="mt-1">
              <input
                id="location"
                type="text"
                required
                placeholder="Where is your house?"
                {...register("cost")}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="location"
              className="block text-sm font-semibold text-gray-700"
            >
              Do you have any additional features?
            </label>
            <div className="mt-1">
              <input
                id="location"
                type="text"
                required
                placeholder="Where is your house?"
                {...register("features")}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="location"
              className="block text-sm font-semibold text-gray-700"
            >
              Brief Description (OPTIONAL)
            </label>
            <div className="mt-1">
              <input
                id="location"
                type="text"
                required
                placeholder="Where is your house?"
                {...register("description")}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="location"
              className="block text-sm font-semibold text-gray-700"
            >
              Upload photos of the house (Minimum of 3)
            </label>
            <div className="mt-1">
              <input
                id="location"
                type="text"
                required
                placeholder="Where is your house?"
                {...register("images")}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-figma-pink hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              Finish
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

// HouseCreate.getInitialProps = async (ctx: NextPageContext) => {
//   const { data, loading, error } = useQuery(GET_TYPE, {
//     variables: { type: "house_types" },
//   });

//   return { houseTypes: data?.types };
// };

export const getStaticProps: GetStaticProps = async (
  ctx: GetStaticPropsContext
) => {
  // const cookie = nookies.get(ctx.req, {path:})
  console.log("context is", ctx);
  const response = await axios.post(
    "http://localhost:1337/graphql",
    {
      query: print(GET_TYPE),
      variables: {
        type: "house_type",
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI4NzkxMzY4LCJleHAiOjE2MzEzODMzNjh9.Uahqq-fQ09M0Q2bLG8EU3-T8paO7h-N3Diq0QCJp4zQ",
      },
    }
  );

  const houseTypes = response.data.data.types.map((houseType: any) => ({
    name: houseType.name,
    value: houseType.id,
    icon: houseType.icon?.url ?? null,
  }));

  console.log(houseTypes);
  return { props: { houseTypes } };
};

interface IFormInput {
  location: { lat: number; lng: number };
  description: String;
  cost: number;
  features: String[];
  type: String[];
  images: File[];
}

const ADD_HOUSE: TypedDocumentNode = gql`
  mutation AddHouse($house: HouseInput) {
    createHouse(input: { data: $house }) {
      house {
        id
      }
    }
  }
`;

const GET_TYPE: TypedDocumentNode = gql`
  query GetType($type: String!) {
    types(where: { type: $type }) {
      id
      name
      icon {
        url
      }
    }
  }
`;
export default HouseCreate;
