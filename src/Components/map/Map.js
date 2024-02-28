import "./Map.css";
import "leaflet/dist/leaflet.css";

// import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";

import Routing from "../functions/Routing";
import { Marker } from "@vis.gl/react-google-maps";

export const MapCon = ({
  latitude,
  longitude,
  userOrLocation,
  submit,
  selectFaculty,
  setUseRoute,
  setDestinationLat,
  setDestinationLng,
}) => {
  const [location, setLocation] = useState([]);
  const [check, setChecked] = useState([]);

  const icon = L.icon({
    iconUrl: "../../img/location-pin.png",
    iconSize: [38, 38],
  });

  const loadBuilding = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:5000/api/locations/one-name", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setChecked(false);
        setLocation(result);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    loadBuilding();
  }, []);

  const showAllLocation = () => {
    if (!check) {
      if (
        submit &&
        userOrLocation !== "user" &&
        latitude !== "" &&
        longitude !== ""
      ) {
        console.log(1);
        return (
          <>
            {location.map((marker) => {
              if (
                parseFloat(marker.latitude) === latitude &&
                parseFloat(marker.longitude) === longitude
              ) {
                const position = {
                  lat: parseFloat(marker.latitude),
                  lng: parseFloat(marker.longitude),
                };
                return (
                  <>
                    <Marker
                      position={position}
                      onClick={() => {
                        setUseRoute(true)
                        setDestinationLat(marker.latitude)
                        setDestinationLng(marker.longitude)
                      }}
                    ></Marker>
                  </>
                );
              }
            })}
          </>
        );
      } else if (selectFaculty === "") {
        console.log(2);
        return (
          <>
            {location.map((marker) => {
              const position = {
                lat: parseFloat(marker.latitude),
                lng: parseFloat(marker.longitude),
              };
              return (
                <>
                  <Marker
                    position={position}
                    onClick={() => {
                      // setUseRoute(true)
                      // setDestinationLat(marker.latitude)
                      // setDestinationLng(marker.longitude)
                      alert(marker.locationName);
                    }}
                  ></Marker>
                  {/* {open && (
                    <InfoWindow
                      position={position}
                      onCloseClick={() => setOpen(false)}
                    >
                      <h2>{marker.locationName}</h2>
                    </InfoWindow>
                  )} */}
                </>
              );
            })}
          </>
        );
      } else {
        console.log(3);
        return (
          <>
            {location
              .filter((cate) => cate.category == selectFaculty)
              .map((marker) => {
                const position = {
                  lat: parseFloat(marker.latitude),
                  lng: parseFloat(marker.longitude),
                };
                return (
                  <>
                    <Marker
                      position={position}
                      onClick={() => {
                        alert(marker.locationName);
                      }}
                    ></Marker>
                    {/* {open && (
                      <InfoWindow
                        position={position}
                        onCloseClick={() => setOpen(false)}
                      >
                        <h2>{marker.locationName}</h2>
                      </InfoWindow>
                    )} */}
                  </>
                );
              })}
          </>
        );
      }
    }
  };

  useEffect(() => {
    showAllLocation();
  }, [latitude, longitude, userOrLocation, submit, selectFaculty]);

  // const render = (latitude, longitude) => {
  //   const { selectPosition } = [latitude, longitude];

  //   return (
  //     <MapContainer center={[latitude, longitude]} zoom={16}>
  //       <TileLayer
  //         url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
  //         attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  //       />

  //       {showAllLocation()}

  //       <Marker position={[latitude, longitude]} icon={icon}>
  //         <Popup>User Location</Popup>
  //       </Marker>

  //       {/* {directions && <DirectionsRenderer directions={directions} />} */}
  //       {/* <Directions directions={directions} /> */}

  //       <Routing/>

  //       <Marker position={[18.7956489, 98.952533]} icon={icon}>
  //         <Popup>Start Location</Popup>
  //       </Marker>
  //       <Marker position={[18.7964371, 98.95319780000001]} icon={icon}>
  //         <Popup>End Location</Popup>
  //       </Marker>
  //     </MapContainer>
  //   );
  // };

  return <>{showAllLocation()}</>;
};
