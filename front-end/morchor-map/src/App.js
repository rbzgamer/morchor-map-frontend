import "./styles.css";
import "leaflet/dist/leaflet.css";
import "./App.css";

import { Map } from "./Components/map/Map";
import { useEffect, useState } from "react";
import { Navbar } from "./Components/map/Navbar/Navbar";
import { Faculty } from "./Components/map/Navbar/faculty/Faculty";
import { Search } from "./Components/map/Navbar/searching/Search";
import { Building } from "./Components/map/Navbar/building/Building";
import { Room } from "./Components/map/Navbar/room/Room";

function App() {
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

  navigator.geolocation.getCurrentPosition(showPosition);
  async function showPosition(po) {
    setLatitudeFromUser(po.coords.latitude);
    setLongitudeFromUser(po.coords.longitude);
    setFetched(true);
  }

  if (fetched) {
    let latitude = 0.0;
    let longitude = 0.0;
    let userOrLocation = "user";
    if (latitudeFromLocation !== undefined) {
      console.log(1);
      latitude = latitudeFromLocation;
      longitude = longitudeFromLocation;
      userOrLocation = "location";
    } else {
      latitude = latitudeFromUser;
      longitude = longitudeFromUser;
    }

    return (
      <>
        <div className="application">
          <div className="map">
            <Map
              latitude={latitude}
              longitude={longitude}
              userOrLocation={userOrLocation}
              submit={submit}
              selectFaculty={selectFaculty}
            />
          </div>
          <div className="formBlock">
            <Navbar setResults={setResults} setApprove={setApprove} setSubmit = {setSubmit} results = {results}/>
            {approve && results && results.length > 0 && (
              <Search
                searchData={results}
                setLatitudeFromLocation={setLatitudeFromLocation}
                setLongitudeFromLocation={setLongitudeFromLocation}
                setSubmit={setSubmit}
              />
            )}
            {!approve &&
              (choose === "Faculty" || choose === "") &&
              !approve && (
                <Faculty
                  setChoose={setChoose}
                  setSelectFaculty={setSelectFaculty}
                />
              )}
            {!approve && choose === "Building" && (
              <Building
                setChoose={setChoose}
                setSelectBuilding={setSelectBuilding}
                selectFaculty={selectFaculty}
                setLatitudeFromLocation={setLatitudeFromLocation}
                setLongitudeFromLocation={setLongitudeFromLocation}
                setSubmit={setSubmit}
                setSelectFaculty={setSelectFaculty}
              />
            )}
            {!approve && choose === "Room" && (
              <Room
                setChoose={setChoose}
                selectBuilding={selectBuilding}
                setLatitudeFromLocation={setLatitudeFromLocation}
                setLongitudeFromLocation={setLongitudeFromLocation}
                latitudeFromLocation={latitudeFromLocation}
                longitudeFromLocation={longitudeFromLocation}
                setSubmit={setSubmit}
              />
            )}
          </div>
        </div>
      </>
    );
  }
}

export default App;
