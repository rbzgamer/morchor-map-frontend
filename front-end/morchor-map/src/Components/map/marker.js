import L from "leaflet";

const markerIcon = new L.Icon({
  iconUrl: "../../img/location-pin.png",
  iconSize: [38, 38],
});

const MarkerMap = () => {
        const markers = [
      {
        geocode: [18.795612015074767, 98.95285065288007],
        popUp: "ตึก 30 ปี",
      },
      {
        geocode: [18.801588909598827, 98.95336653591599],
        popUp: "SCB 1",
      },
      {
        geocode: [18.797201944092684, 98.95183596448591],
        popUp: "หอ 5 ชาย",
      },
    ];

    return (markerIcon, markers)
}

export default MarkerMap;