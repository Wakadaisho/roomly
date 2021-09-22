import { NextPage } from "next";
import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useState, ReactNode } from "react";
// import { CurrentLocation } from "@styled-icons/boxicons-regular";
import { markerToPositionString } from "@utils/map";

type Props = {
  apiKey: string;
  mapOptions?: { center: { lat: number; lng: number }; zoom: number };
  id?: number;
  readOnly?: boolean;
  multiple?: boolean;
  children?: ReactNode | any;
  onClick?: Function;
  propsAddedMarkers?: any[] | null;
  setAddedMarkers?: any;
};

var update_timeout: any = null;

const Map: NextPage<Props> = ({
  apiKey,
  mapOptions,
  readOnly,
  id = 0,
  multiple,
  onClick,
  children,
  propsAddedMarkers,
  setAddedMarkers,
}) => {
  const ICON_BASE_SHAPES = "https://maps.google.com/mapfiles/kml/shapes/";
  const ICON_BASE_PADDLE = "https://maps.google.com/mapfiles/kml/paddle/";

  const [map, setMap] = useState<google.maps.Map>();

  let markers: any[] = [];

  let setMarkers: any[] = [];

  // console.log(markers);

  const [loader, setLoader] = useState<Loader>();

  const findClickedMarker = (clickedMarker: any, markerArray: any) => {
    const markerPosition = {
      lat: clickedMarker.latLng.lat(),
      lng: clickedMarker.latLng.lng(),
    };

    const markerIndex = markerArray.findIndex(
      (mark: any) =>
        JSON.stringify(markerPosition) ===
        JSON.stringify({
          lat: mark.getPosition().lat(),
          lng: mark.getPosition().lng(),
        })
    );
    return markerIndex;
  };

  const deletedClickedMarker = (e: any) => {
    const markerIndex = findClickedMarker(e, markers);
    if (markerIndex !== -1) {
      const deletedMarker = markers.splice(markerIndex, 1);
      deletedMarker?.[0]?.setMap(null);
    }
  };

  const addMarker = (
    location: google.maps.LatLngLiteral,
    map: google.maps.Map
  ) => {
    // Add the marker at the clicked location, and add the next-available label
    // from the array of alphabetical characters.
    if (!readOnly) {
      if (multiple) {
        const marker = new google.maps.Marker({
          position: location,
          map: map,
        });

        markers.push(marker);
        // onClick?.(markerToPositionString(marker));
      } else {
        const marker = new google.maps.Marker({
          position: location,
          map: map,
        });
        marker.addListener("dblclick", deletedClickedMarker);

        if (markers.length < 1) {
          markers.push(marker);
          // onClick?.(markerToPositionString(marker));
        } else {
          markers[0].setMap(null);
          markers[0] = marker;
        }
      }
      setAddedMarkers([...markers]);
    }
  };

  const initialize = () => {
    goToGeoPosition();
    // if (markers) {
    //   markers.forEach(({ position }) => {
    //     new google.maps.Marker({
    //       position: { lat: position.lat(), lng: position.lng() },
    //       animation: google.maps.Animation.DROP,
    //       map: map,
    //     });
    //   });
    // }

    if (children) {
      if (Array.isArray(children)) {
        children.forEach(({ props }) => {
          const marker = new google.maps.Marker({
            position: { lat: props.lat, lng: props.lng },
            animation: google.maps.Animation.DROP,
            map: map,
          });
          marker.addListener("dblclick", deletedClickedMarker);
          markers.push(marker);
        });
      } else {
        const marker = new google.maps.Marker({
          position: { lat: children.props.lat, lng: children.props.lng },
          animation: google.maps.Animation.DROP,
          map: map,
        });
        marker.addListener("dblclick", deletedClickedMarker);
        markers.push(marker);
      }
    }

    if (!readOnly) {
      google.maps.event.addListener(map!, "click", (event: any) => {
        update_timeout = setTimeout(function () {
          addMarker(event.latLng, map!);
        }, 200);
      });
      google.maps.event.addListener(map!, "dblclick", (event: any) => {
        clearTimeout(update_timeout);
      });
    }
  };

  const goToGeoPosition = () => {
    if (map) {
      const locationControlDiv = document.createElement("div");
      LocationControl(locationControlDiv, map);
      map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(
        locationControlDiv
      );

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            // setMarkers([
            //   ...markers,
            //   new google.maps.Marker({
            //     position: pos,
            //     map: map,

            //     optimized: false,
            //   }),
            // ]);

            map.panTo(pos);
          },
          () => {
            console.log("error");
          }
        );
      }
    }
  };

  // Create new loader
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

  // Use the loader to initalize a new map
  useEffect(() => {
    if (propsAddedMarkers) {
      markers = [...propsAddedMarkers!];
    }

    if (loader) {
      loader.load().then(() => {
        setMap(
          new google.maps.Map(document.getElementById(`map-${id}`)!, {
            ...mapOptions,
            mapId: "839149427cb3fff7",
            fullscreenControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            gestureHandling: "greedy",
            // disableDoubleClickZoom: true,
          })
        );
      });
    }
  }, [loader]);

  // Add markers to map if they exists (markers are children props to Map)
  useEffect(() => {
    if (map) {
      initialize();
    }
  }, [map]);

  return (
    <div className="p-2 w-96 h-96 sm:w-120 sm:h-120 md:w-120 md:h-120 lg:h-140 lg:w-140 xl:w-160 xl:h-160 rounded-lg">
      <div className="h-full w-full" id={`map-${id}`}></div>
    </div>
  );
};

function LocationControl(controlDiv: Element, map: google.maps.Map) {
  // Set CSS for the control border.
  const controlUI = document.createElement("div");
  controlUI.style.backgroundColor = "#fff";
  controlUI.style.border = "2px solid #fff";
  controlUI.style.borderRadius = "3px";
  controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
  controlUI.style.cursor = "pointer";
  controlUI.style.marginTop = "8px";
  controlUI.style.marginBottom = "22px";
  controlUI.style.textAlign = "center";
  controlUI.title = "Go to current location";
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  const controlText = document.createElement("div");
  controlText.style.color = "rgb(25,25,25)";
  controlText.style.fontFamily = "Roboto,Arial,sans-serif";
  controlText.style.fontSize = "16px";
  controlText.style.lineHeight = "38px";
  controlText.style.paddingLeft = "5px";
  controlText.style.paddingRight = "5px";
  controlText.innerHTML = `<svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <title>Go to current location</title>
    <desc>Created with Sketch.</desc>
    <g id="🔍-Product-Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="current_location" fill="#212121" fill-rule="nonzero">
            <path d="M12,2 C12.5128358,2 12.9355072,2.38604019 12.9932723,2.88337887 L13,3 L13.0003445,4.31396524 C16.4808766,4.76250386 19.238071,7.51999063 19.6861644,11.0006622 L21,11 C21.5522847,11 22,11.4477153 22,12 C22,12.5128358 21.6139598,12.9355072 21.1166211,12.9932723 L21,13 L19.6860348,13.0003445 C19.2375394,16.480541 16.480541,19.2375394 13.0003445,19.6860348 L13,21 C13,21.5522847 12.5522847,22 12,22 C11.4871642,22 11.0644928,21.6139598 11.0067277,21.1166211 L11,21 L11.0006622,19.6861644 C7.51999063,19.238071 4.76250386,16.4808766 4.31396524,13.0003445 L3,13 C2.44771525,13 2,12.5522847 2,12 C2,11.4871642 2.38604019,11.0644928 2.88337887,11.0067277 L3,11 L4.31383558,11.0006622 C4.7619722,7.51965508 7.51965508,4.7619722 11.0006622,4.31383558 L11,3 C11,2.44771525 11.4477153,2 12,2 Z M12,6.25 C8.82436269,6.25 6.25,8.82436269 6.25,12 C6.25,15.1756373 8.82436269,17.75 12,17.75 C15.1756373,17.75 17.75,15.1756373 17.75,12 C17.75,8.82436269 15.1756373,6.25 12,6.25 Z M12,8 C14.209139,8 16,9.790861 16,12 C16,14.209139 14.209139,16 12,16 C9.790861,16 8,14.209139 8,12 C8,9.790861 9.790861,8 12,8 Z" id="🎨-Color"></path>
        </g>
    </g>
</svg>`;
  controlUI.appendChild(controlText);

  // Setup the click event listeners
  controlUI.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        map.panTo(pos);
        map.setZoom(15);
      },
      () => {
        console.log("error");
      }
    );
  });
}

export default Map;
