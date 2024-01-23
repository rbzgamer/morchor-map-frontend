import "./Map.css";
import "leaflet/dist/leaflet.css";

import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";
import "https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.js";
import Routing from "../functions/Routing";

export const Map = ({latitude, longitude, userOrLocation, submit, selectFaculty}) => {
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
      if (submit && userOrLocation !== 'user' && latitude !== "" && longitude !== "") {
        return (
          <>
            {location
              .filter((cate) => cate.latitude === latitude && cate.longitude === longitude)
              .map((marker) => (
                <Marker
                  position={[
                    parseFloat(marker.latitude),
                    parseFloat(marker.longitude),
                  ]}
                  icon={icon}
                >
                  <Popup>
                    <h2>{marker.locationName}</h2>
                  </Popup>
                </Marker>
              ))}
          </>
        );
      } else if (selectFaculty === "") {
        return (
          <>
            {location.map((marker) => (
              <Marker
                position={[
                  parseFloat(marker.latitude),
                  parseFloat(marker.longitude),
                ]}
                icon={icon}
              >
                <Popup>
                  <h2>{marker.locationName}</h2>
                </Popup>
              </Marker>
            ))}
          </>
        );
      } else {
        return (
          <>
            {location
              .filter((cate) => cate.category == selectFaculty)
              .map((marker) => (
                <Marker
                  position={[
                    parseFloat(marker.latitude),
                    parseFloat(marker.longitude),
                  ]}
                  icon={icon}
                >
                  <Popup>
                    <h2>{marker.locationName}</h2>
                  </Popup>
                </Marker>
              ))}
          </>
        );
      }
    } else {
      return <></>;
    }
  };


  const render = (latitude, longitude) => {
    const { selectPosition } = [latitude, longitude];

    return (
      <MapContainer center={[latitude, longitude]} zoom={16}>
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        // marker
        {showAllLocation()}
        // get user position
        <Marker position={[latitude, longitude]} icon={icon}>
          <Popup>User Location</Popup>
        </Marker>
        //get routing
        {/* <Routing/> */}
        {/* <ResetCenterView selectPosition={selectPosition} /> */}
      </MapContainer>
    );
  };

  // if (fetched) {
    return <>{render(latitude, longitude)}</>;
  // }
};
