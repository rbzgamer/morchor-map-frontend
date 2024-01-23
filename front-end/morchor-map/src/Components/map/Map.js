import "./Map.css";
import "leaflet/dist/leaflet.css";

import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";
import "https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.js";
import Routing from "../functions/Routing";

const Map = (props) => {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [fetched, setFetched] = useState(false);
  const checkFilter = localStorage.getItem("filter") === "true";
  const categoryName = localStorage.getItem("categoryName");
  const lat = localStorage.getItem("lat");
  const lon = localStorage.getItem("lon");

  const resetViewFromBuilding = localStorage.getItem("resetViewFromBuilding") === 'true';
  const resetViewFromRoom = localStorage.getItem("resetViewFromRoom") === 'true';

  navigator.geolocation.getCurrentPosition(showPosition);

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
    if (lat !== "" && lon !== "") {
      setLatitude(lat);
      setLongitude(lon);
    }

    loadBuilding();
  }, []);

  const showAllLocation = () => {
    if (!check) {
      if (lat !== "" && lon !== "" && resetViewFromBuilding && resetViewFromRoom) {
        return (
          <>
            {location
              .filter((cate) => cate.latitude === lat && cate.longitude === lon)
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
      } else if (!checkFilter) {
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
              .filter((cate) => cate.category == categoryName)
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

  async function showPosition(po) {
    setLatitude(po.coords.latitude);
    setLongitude(po.coords.longitude);
    setFetched(true);
  }

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

  if (fetched) {
    return <>{render(latitude, longitude)}</>;
  }
};

export default Map;
