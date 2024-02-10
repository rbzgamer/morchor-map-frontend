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
import SendIcon from "@mui/icons-material/Send";
import { DirectionBar } from "./Components/map/Navbar/DirectionBar";

// import CardOverflow from '@mui/joy/CardOverflow';

import {
  APIProvider,
  useAdvancedMarkerRef,
  Map,
  Marker,
} from "@vis.gl/react-google-maps";
// import {
//   Box,
//   TextField,
//   IconButton,
//   Card,
//   CardMedia,
//   CardContent,
//   Typography,
//   CardActions,
//   Button,
  
// } from "@mui/material";
// import DirectionsIcon from "@mui/icons-material/Directions";

export default function App() {
  const [results, setResults] = useState([]);
  const [approve, setApprove] = useState(false);
  const [choose, setChoose] = useState("");
  const [selectFaculty, setSelectFaculty] = useState("");
  const [selectBuilding, setSelectBuilding] = useState("");
  const [latitudeFromUser, setLatitudeFromUser] = useState();
  const [longitudeFromUser, setLongitudeFromUser] = useState();
  const [fetched, setFetched] = useState(false);
  const [latitudeFromLocation, setLatitudeFromLocation] = useState();
  const [longitudeFromLocation, setLongitudeFromLocation] = useState();
  const [submit, setSubmit] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDirectionBar, setOpenDirectionBar] = useState(false);

  const [originLat, setOriginLat] = useState();
  const [originLng, setOriginLng] = useState();
  const [destinationLat, setDestinationLat] = useState();
  const [destinationLng, setDestinationLng] = useState();
  const [useRoute, setUseRoute] = useState(false);

  const [markerRef, marker] = useAdvancedMarkerRef();

  navigator.geolocation.getCurrentPosition(showPosition);
  async function showPosition(po) {
    setLatitudeFromUser(po.coords.latitude);
    setLongitudeFromUser(po.coords.longitude);
    setOriginLat(po.coords.latitude);
    setOriginLng(po.coords.longitude);
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

    return (
      <>
        <div className="application">
          {/* Base Map */}
          <div style={{ height: "100vh", width: "100%" }}>
            {/* <APIProvider apiKey="AIzaSyC4hElrEUcoCj-GAu6Y6qtfh2xOq4iZf9E">
              <Map center={position} zoom={15} mapId="d024e2b838dd693a">

                <Marker
                  position={{lat: latitudeFromUser, lng: longitudeFromUser}}
                  onClick={() => {alert("User Location")}}
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
                  />
                )}
              </Map>
            </APIProvider> */}
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
            />
            {/* Route Bar */}
            {openDirectionBar && <DirectionBar />}
            {/* Search Result*/}
            {approve && results && results.length > 0 && (
              <Search
                searchData={results}
                setLatitudeFromLocation={setLatitudeFromLocation}
                setLongitudeFromLocation={setLongitudeFromLocation}
                setSubmit={setSubmit}
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
                setSelectFaculty={setSelectFaculty}
                open={open}
              />
            )}
            {/* Room Result */}
            {!approve && choose === "Room" && (
              <Room
                setChoose={setChoose}
                selectBuilding={selectBuilding}
                setLatitudeFromLocation={setLatitudeFromLocation}
                setLongitudeFromLocation={setLongitudeFromLocation}
                latitudeFromLocation={latitudeFromLocation}
                longitudeFromLocation={longitudeFromLocation}
                setSubmit={setSubmit}
                open={open}
              />
            )}

            {/* <Card sx={{ maxWidth: 510 }}>
              <div>
                <CardOverflow
                  sx={{ height: 140 }}
                  image="https://img.freepik.com/premium-vector/building-logo-icon-design-template-vector_67715-555.jpg"
                  width={50}
                  height={50}
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                  </Typography>
                </CardContent>
              </div>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card> */}
          </div>
        </div>
      </>
    );
  }
}
