import "./styles.css";
import "leaflet/dist/leaflet.css";
import "./App.css";

import { MapCon } from "./Components/map/Map";
import { useEffect, useState } from "react";
import { Navbar } from "./Components/map/Navbar/Navbar";
import { Faculty } from "./Components/map/Navbar/faculty/Faculty";
import { Search } from "./Components/map/Navbar/searching/Search";
import { Building } from "./Components/map/Navbar/building/Building";
import { Room } from "./Components/map/Navbar/room/Room";
import { Directions } from "./Components/map/Directions";
import { DirectionBar } from "./Components/map/Navbar/DirectionBar";

// import SendIcon from "@mui/icons-material/Send";
// import AspectRatio from "@mui/joy/AspectRatio";
// import Card from "@mui/joy/Card";
// import CardContent from "@mui/joy/CardContent";
// import Typography from "@mui/joy/Typography";
// import { IconButton } from "@mui/material";

import {
  APIProvider,
  useAdvancedMarkerRef,
  Map,
  Marker,
} from "@vis.gl/react-google-maps";

export default function App() {
  const [results, setResults] = useState([]);
  const [approve, setApprove] = useState(false);
  const [choose, setChoose] = useState("Faculty");
  const [selectFaculty, setSelectFaculty] = useState("");
  const [selectBuilding, setSelectBuilding] = useState("");
  const [latitudeFromUser, setLatitudeFromUser] = useState();
  const [longitudeFromUser, setLongitudeFromUser] = useState();
  const [fetched, setFetched] = useState(false);
  const [latitudeFromLocation, setLatitudeFromLocation] = useState();
  const [longitudeFromLocation, setLongitudeFromLocation] = useState();
  const [submit, setSubmit] = useState(false);
  const [open, setOpen] = useState(true);
  const [openDirectionBar, setOpenDirectionBar] = useState(false);

  const [originName, setOriginName] = useState("User Location");
  const [originLat, setOriginLat] = useState();
  const [originLng, setOriginLng] = useState();
  const [destinationName, setDestinationName] = useState("Destination");
  const [destinationLat, setDestinationLat] = useState();
  const [destinationLng, setDestinationLng] = useState();
  const [useRoute, setUseRoute] = useState(false);

  const [markerRef, marker] = useAdvancedMarkerRef();

  navigator.geolocation.getCurrentPosition(showPosition);
  async function showPosition(po) {
    setLatitudeFromUser(po.coords.latitude);
    setLongitudeFromUser(po.coords.longitude);
    // setOriginLat(po.coords.latitude);
    // setOriginLng(po.coords.longitude);
    setFetched(true);
  }

  if (fetched) {
    let latitude = 0.0;
    let longitude = 0.0;
    let userOrLocation = "user";
    if (latitudeFromLocation !== undefined) {
      latitude = parseFloat(latitudeFromLocation);
      longitude = parseFloat(longitudeFromLocation);
      userOrLocation = "location";
    } else {
      latitude = parseFloat(latitudeFromUser);
      longitude = parseFloat(longitudeFromUser);
    }

    const position = { lat: latitude, lng: longitude };

    // console.log(originLat + " " + originLng);

    return (
      <>
        <div className="application">
          {/* Base Map */}
          <div style={{ height: "100vh", width: "100%" }}>
            <APIProvider apiKey="AIzaSyC4hElrEUcoCj-GAu6Y6qtfh2xOq4iZf9E">
              <Map center={position} zoom={15} mapId="d024e2b838dd693a">
                <Marker
                  position={{ lat: latitudeFromUser, lng: longitudeFromUser }}
                  onClick={() => {
                    alert("User Location");
                  }}
                ></Marker>

                <MapCon
                  latitude={latitude}
                  longitude={longitude}
                  userOrLocation={userOrLocation}
                  submit={submit}
                  selectFaculty={selectFaculty}
                  setUseRoute={setUseRoute}
                  setDestinationLat={setDestinationLat}
                  setDestinationLng={setDestinationLng}
                />
                {useRoute && (
                  <Directions
                    firstLocation={{ lat: originLat, lng: originLng }}
                    secondLocation={{
                      lat: destinationLat,
                      lng: destinationLng,
                    }}
                    useRoute={useRoute}
                    setUseRoute={setUseRoute}
                  />
                )}
              </Map>
            </APIProvider>
          </div>
          <div className="formBlock">
            {/* Navbar */}
            <Navbar
              setResults={setResults}
              setApprove={setApprove}
              setSubmit={setSubmit}
              setUseRoute={setUseRoute}
              open={open}
              setOpen={setOpen}
              openDirectionBar={openDirectionBar}
              setOpenDirectionBar={setOpenDirectionBar}
              setChoose={setChoose}
              setSelectFaculty={setSelectFaculty}
              choose={choose}
              setOriginName={setOriginName}
              setDestinationName={setDestinationName}
              latitudeFromUser={latitudeFromUser}
              longitudeFromUser={longitudeFromUser}
              setOriginLat={setOriginLat}
              setOriginLng={setOriginLng}
              useRoute={useRoute}
            />
            {/* Route Bar */}
            {openDirectionBar && (
              <DirectionBar
                originName={originName}
                destinationName={destinationName}
                setUseRoute={setUseRoute}
                latitudeFromUser={latitudeFromUser}
                longitudeFromUser={longitudeFromUser}
                setOriginLat={setOriginLat}
                setOriginLng={setOriginLng}
              />
            )}
            {/* Search Result*/}
            {approve && results && results.length > 0 && (
              <Search
                searchData={results}
                setLatitudeFromLocation={setLatitudeFromLocation}
                setLongitudeFromLocation={setLongitudeFromLocation}
                setSubmit={setSubmit}
                setOriginName={setOriginName}
                setOriginLat={setOriginLat}
                setOriginLng={setOriginLng}
                setDestinationName={setDestinationName}
                setDestinationLat={setDestinationLat}
                setDestinationLng={setDestinationLng}
                setOpenDirectionBar={setOpenDirectionBar}
              />
            )}
            {/* Category Result */}
            {(choose === "Faculty" || choose === "") && !approve && (
              <Faculty
                setChoose={setChoose}
                setSelectFaculty={setSelectFaculty}
                open={open}
              />
            )}
            {/* Building Result */}
            {!approve && choose === "Building" && (
              <Building
                setChoose={setChoose}
                setSelectBuilding={setSelectBuilding}
                selectFaculty={selectFaculty}
                setLatitudeFromLocation={setLatitudeFromLocation}
                setLongitudeFromLocation={setLongitudeFromLocation}
                setSubmit={setSubmit}
                open={open}
                setOriginName={setOriginName}
                setOriginLat={setOriginLat}
                setOriginLng={setOriginLng}
                setDestinationName={setDestinationName}
                setDestinationLat={setDestinationLat}
                setDestinationLng={setDestinationLng}
                setOpenDirectionBar={setOpenDirectionBar}
              />
            )}
            {/* Room Result */}
            {!approve && choose === "Room" && (
              <Room
                selectBuilding={selectBuilding}
                latitudeFromLocation={latitudeFromLocation}
                longitudeFromLocation={longitudeFromLocation}
                setSubmit={setSubmit}
                open={open}
                setOriginName={setOriginName}
                setOriginLat={setOriginLat}
                setOriginLng={setOriginLng}
                setDestinationName={setDestinationName}
                setDestinationLat={setDestinationLat}
                setDestinationLng={setDestinationLng}
                setOpenDirectionBar={setOpenDirectionBar}
              />
            )}
          </div>
        </div>
      </>
    );
  }
}
