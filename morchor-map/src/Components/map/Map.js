import "./Map.css";
import "leaflet/dist/leaflet.css";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";

const markerIcon = new L.Icon({
  iconUrl: "../../img/location-pin.png",
  iconSize: [38, 38],
});

const Map = () => {
  const [inputs, setInputs] = useState();
  const [search, setSearch] = useState(false);

  const handleChange = (event) => {
    // if(inputs.name == '') setSearch(false)
    // console.log(inputs);
    const name = event.target.name;
    const value = event.target.value;
    setInputs(value);
  
  };

  useEffect(() => {
    render()
  }, [search])

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

  const render = () => {
    if(search){
      return (
        <>
        {
          Search(inputs)
        }
        </>
      );
    }else{
      return (
        <>
          {MarkerMap()}
        </>
      );
    }
  }

  const MarkerMap = () => {
    return (
      <>
        {markers.map((marker) => (
          <Marker position={marker.geocode} icon={markerIcon}>
            <Popup>
              <h2>{marker.popUp}</h2>
            </Popup>
          </Marker>
        ))}
      </>
    );
  };

  const handleSubmit = () => {
    setSearch(true)
  };

  const handleClear = () => {
    setSearch(false)
    setInputs("")
  }

  const Search = (name) => {
    const item = markers.filter(mar => mar.popUp === name)
    return (
      <>
      {
        item.map(item => (
          <Marker position={item.geocode} icon={markerIcon}>
            <Popup>
              <h2>{item.popUp}</h2>
            </Popup>
          </Marker>
        ))
      }
      </>
    );
  };

  const BasicMap = () => {
    return (
      <>
        <div className="formBlock">
          <form id="form">
            <input
              type="text"
              className="input"
              id="start"
              placeholder="Search..."
              name="name"
              value={inputs}
              onChange={handleChange}
            ></input>
            <text onClick={handleSubmit} >Click here!</text>
            <text>        </text>
            <text onClick={handleClear} >Reset here!</text>
          </form>
        </div>

        <div>
          <MapContainer center={[18.8082, 98.9547]} zoom={16}>
            <TileLayer
              url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            {render()}

          </MapContainer>
        </div>
      </>
    );
  };

  return <div>{BasicMap()}</div>;
};

export default Map;
