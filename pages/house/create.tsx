import { useMutation, gql, TypedDocumentNode } from "@apollo/client";
import axios from "axios";
import { print } from "graphql";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useState, useEffect } from "react";

import MainLayout from "@layouts/mainLayout";
import Select, { Option } from "@components/ui/form/Select";
import Map from "@components/Map";
import MultiSelect from "@components/ui/form/MulitSelect";
import TextInput from "@components/ui/form/TextInput";
import TextArea from "@components/ui/form/TextArea";
import ImageInput from "@components/ui/images/ImageInput";
import Modal from "@components/ui/Modal";
import { markerToPositionString } from "@utils/map";

import { useForm, Controller } from "react-hook-form";

import { NextPage } from "next";

interface Props {
  houseTypes: Option[];
  houseFeatures: Option[];
}

const HouseCreate: NextPage<Props> = ({ houseTypes, houseFeatures }) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<IFormInput>();

  const [houseImages, setHouseImages] = useState<any[]>([]);
  const [houseTypesOptions, setHouseTypesOptions] = useState<Option[]>([]);
  const [houseFeaturesOptions, setHouseFeaturesOptions] = useState<Option[]>(
    []
  );
  const [addedMarkers, setAddedMarkers] = useState<any[] | null>([]);

  const [
    addHouse,
    { data: data_house, loading: loading_house, error: error_house },
  ] = useMutation(ADD_HOUSE);
  const [
    uploadImages,
    { data: data_images, loading: loading_images, error: error_images },
  ] = useMutation(UPLOAD_IMAGES);

  const onSubmit = async (data: any) => {
    var formData = new FormData();

    data.location = JSON.parse(markerToPositionString(addedMarkers?.[0]));
    data.house_features = houseFeaturesOptions.map(({ value }) => value);

    // for (let i = 0; i < houseImages.length; i++) {
    //   const file = houseImages[i];
    //   formData.append(`files`, file);
    // }

    // console.log("Uploading", houseImages);
    // console.log(houseImages);

    // axios
    //   .post(`http://localhost:1337/upload`, formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //       Authorization:
    //         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI4NzkxMzY4LCJleHAiOjE2MzEzODMzNjh9.Uahqq-fQ09M0Q2bLG8EU3-T8paO7h-N3Diq0QCJp4zQ",
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    try {
      uploadImages({ variables: { files: houseImages } }).then((response) => {
        console.log(response);
        if (response.data) {
          data.images = response.data.multipleUpload.map(
            ({ id }: { id: string | number }) => id
          );
          addHouse({ variables: { house: data } });
        }
      });
    } catch (e) {
      console.log(e.message);
    }

    // console.log("Response", await data_house);
    // data.images = houseImages;

    // console.log("Submitting", form_data);
    // addHouse({ variables: { house: data } });
  };

  return (
    <MainLayout
      user={{}}
      loading={false}
      pageTitle="Add House"
      subTitle="Host your house"
    >
      <div className="p-4 font-rubik block font-medium">
        <p>
          Hi{<span className="font-semibold"> Paul</span>}, let's get started
          listing your place
        </p>
      </div>
      <div className="flex justify-start p-4 font-rubik">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="location_name"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="e.g. Nairobi"
                title="Location"
                value={value}
                onChange={onChange}
              />
            )}
          />

          {/* <Controller
            control={control}
            name="location"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Click to mark location on a map"
                title="Map pin"
                value={JSON.stringify(value)}
                required
                onClick={() => setMapModalOpen(true)}
                onChange={onChange}
              />
            )}
          /> */}

          <div>
            <label
              htmlFor="location"
              className="block text-sm font-semibold text-gray-700"
            >
              Set location on map
            </label>
            <Map
              mapOptions={{
                center: {
                  lat: 0,
                  lng: 0,
                },
                zoom: 15,
              }}
              // readOnly
              // onClick={(value: string) => {
              //   setValue("location", value);
              //   setMapModalOpen(false);
              // }}
              propsAddedMarkers={addedMarkers}
              setAddedMarkers={setAddedMarkers}
              apiKey="AIzaSyDBTDiyc8UndfMRRdOPcC-XCpAXwAvVqIA"
            ></Map>
          </div>

          <Controller
            control={control}
            name="house_type"
            defaultValue={houseTypes[0].value}
            render={({ field: { onChange, value } }) => (
              <Select
                onChange={onChange}
                value={value}
                title="Select the type of house"
                options={houseTypes}
              />
            )}
          />

          <Controller
            control={control}
            name="house_features"
            render={({ field: { onChange } }) => (
              <MultiSelect
                onChange={onChange}
                changeSelectedValues={setHouseFeaturesOptions}
                title="Select the type of house"
                placeholder="Select type of house..."
                options={houseFeatures}
              />
            )}
          />

          <Controller
            control={control}
            name="cost"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="How much are you charging?"
                title="Cost (Ksh)?"
                value={value}
                number
                onChange={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <TextArea
                placeholder="e.g. Building/House/Room number"
                title="Area/House description"
                value={value}
                onChange={onChange}
              />
            )}
          />

          <div>
            <label
              htmlFor="location"
              className="block text-sm font-semibold text-gray-700"
            >
              Upload photos of the house (Minimum of 3)
            </label>
            <ImageInput setImages={setHouseImages} />
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

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const response = await axios.post(
    "http://localhost:1337/graphql",
    {
      query: print(GET_HOUSE_OPTIONS),
      variables: {},
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjMxNzA5MDExLCJleHAiOjE2MzQzMDEwMTF9.-bWpL2LylPUFeRYgH2lD3VMcTwYH2MCK4eSpEOAFX2E",
      },
    }
  );

  console.log("response", response.data.data);

  const houseTypes = response.data.data.houseTypes.map((houseType: any) => ({
    name: houseType.name,
    value: houseType.id,
    icon: houseType.icon?.url ?? null,
  }));

  const houseFeatures = response.data.data.houseFeatures.map(
    (houseFeature: any) => ({
      name: houseFeature.name,
      value: houseFeature.id,
      icon: houseFeature.icon?.url ?? null,
    })
  );

  return { props: { houseTypes, houseFeatures } };
};

interface IFormInput {
  location: string;
  location_name: string;
  description: string;
  cost: number;
  house_features: string[];
  house_type: number | string;
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

const GET_HOUSE_OPTIONS: TypedDocumentNode = gql`
  query GetHouseOptions {
    houseTypes {
      id
      name
      icon {
        url
      }
    }

    houseFeatures {
      id
      name
      icon {
        url
      }
    }
  }
`;
const UPLOAD_IMAGES: TypedDocumentNode = gql`
  mutation ($files: [Upload]!) {
    multipleUpload(files: $files) {
      id
      name
    }
  }
`;

export default HouseCreate;
