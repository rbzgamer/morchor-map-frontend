import { useEffect, useState } from "react";
import { useMapsLibrary, useMap } from "@vis.gl/react-google-maps";

export const Directions = (location) => {
  const map = useMap();
  const routeLibrary = useMapsLibrary("routes");
  const [directionService, setDirectionService] = useState();
  const [directionRenderer, setDirectionRenderer] = useState();
  const [route, setRoute] = useState();

  // console.log(location.useRoute);

  useEffect(() => {
    if (!routeLibrary || !map) return;
    if (!directionService) {
      setDirectionService(new routeLibrary.DirectionsService());
    }
    if (!directionRenderer) {
      setDirectionRenderer(new routeLibrary.DirectionsRenderer({ map }));
    }
  }, [routeLibrary, map]);

  useEffect(() => {
    if (!directionService || !directionRenderer) return;

    if (location.useRoute) {
      directionService
        .route({
          origin: {
            lat: location.firstLocation.lat,
            lng: location.firstLocation.lng,
          },
          destination: {
            lat: parseFloat(location.secondLocation.lat),
            lng: parseFloat(location.secondLocation.lng),
          },
          travelMode: "DRIVING",
        })
        .then((response) => {
          directionRenderer.setDirections(response);
          // setRoute(response.routes);
          // console.log(response);
        });
    }
  }, [directionService, directionRenderer]);

  return null;
};
