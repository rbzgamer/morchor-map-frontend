import "./Map.css";
import "leaflet/dist/leaflet.css";

import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";
import "https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.js";
import Routing from "../functions/Routing";

const icon = L.icon({
  iconUrl: "../../img/location-pin.png",
  iconSize: [38, 38],
});

const ResetCenterView = (props) => {
  const { selectPosition } = props;
  const map = useMap();

  useEffect(() => {
    if (selectPosition) {
      map.setView(
        L.latLng(selectPosition?.lat, selectPosition?.lon),
        map.getZoom(),
        { animate: true }
      );
    }
  }, [selectPosition]);

  return null;
};

const markers = [
  {
    id: 0,
    geocode: [18.795612015074767, 98.95285065288007],
    popUp: "ตึก 30 ปี",
  },
  {
    id: 1,
    geocode: [18.801588909598827, 98.95336653591599],
    popUp: "SCB 1",
  },
  {
    id: 2,
    geocode: [18.797201944092684, 98.95183596448591],
    popUp: "หอ 5 ชาย",
  },
];

const render = (latitude, longitude) => {
  return (
    <MapContainer center={[latitude, longitude]} zoom={16}>
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />

      // marker
      {markers.map((marker) => (
        <Marker position={marker.geocode} icon={icon}>
          <Popup>
            <h2>{marker.popUp}</h2>
          </Popup>
        </Marker>
      ))}

      // get user position
      <Marker position={[latitude, longitude]} icon={icon}>
        <Popup>
          User Location
        </Popup>
      </Marker>

      //get routing
      {/* <Routing/> */}
    </MapContainer>
  );
};


const Map = (props) => {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [fetch, setFetch] = useState(false);

  navigator.geolocation.getCurrentPosition(showPosition);
  const { selectPosition } = props;
  const locationSelection = [selectPosition?.lat, selectPosition?.lon];

  async function showPosition(po) {
    setLatitude(po.coords.latitude);
    setLongitude(po.coords.longitude);
    setFetch(true);
  }

  if (fetch) {
    return <>{render(latitude, longitude)}</>;
  }
};

export default Map;
