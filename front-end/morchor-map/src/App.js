import "./styles.css";
import "leaflet/dist/leaflet.css";
import "./App.css";

import Map from "./Components/map/Map";
import { useState } from "react";
import SearchBox from "./Components/map/SearchBox";

function App() {
  const [selectPosition, setSelectPosition] = useState(null);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div style={{ width: "100vw", height: "100%" }}>
        <Map selectPosition={selectPosition} />
      </div>
      <SearchBox
        selectPosition={selectPosition}
        setSelectPosition={setSelectPosition}
      />
    </div>
  );
}

export default App;
