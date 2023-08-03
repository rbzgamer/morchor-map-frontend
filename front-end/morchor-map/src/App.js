import "./styles.css";
import "leaflet/dist/leaflet.css";
import "./App.css";

import Map from "./Components/map/Map";

function App() {
  return <>
  {/* <div className="formBlock">
    <form id="form">
      <input type="text" name="start" className="input" id="start" placeholder="Choose starting point"></input>
      <input type="text" name="end" className="input" id="destination" placeholder="Choose destination point"></input>
      <button type="submit">Get destination</button>
    </form>

  </div> */}

    <div className = "container">
      <Map/>
    </div>
    
  </>
}

export default App;
