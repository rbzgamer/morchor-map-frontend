import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
});

const Routing = () => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(18.795612015074767, 98.95285065288007),
        L.latLng(18.801588909598827, 98.95336653591599),
      ],
      routeWhileDragging: true,
    }).addTo(map);

    // return () => map.removeControl(routingControl);
  }, [map]);

  return null;
}

export default Routing
