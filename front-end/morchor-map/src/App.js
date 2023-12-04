import "./styles.css";
import "leaflet/dist/leaflet.css";
import "./App.css";

import Map from "./Components/map/Map";
import { useState } from "react";
import Navbar from "./Components/map/Navbar/Navbar";

function App() {
  const [selectPosition, setSelectPosition] = useState(null);

  return (
    <>
      <div className="application">
        <div className="map">
          <Map selectPosition={selectPosition} />
        </div>
        <Navbar
          selectPosition={selectPosition}
          setSelectPosition={setSelectPosition}
        />
      </div>
    </>
  );
}

export default App;
