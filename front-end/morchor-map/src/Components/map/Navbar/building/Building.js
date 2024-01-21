import "./Building.css";
import { useEffect, useState } from "react";

const Building = () => {
  const [check, setChecked] = useState(true);
  const [building, setFaculty] = useState([]);
  const categoryName = localStorage.getItem("categoryName");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");

  const loadBuilding = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "http://localhost:5000/api/locations/?category=" + categoryName,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setChecked(false);
        setFaculty(result)
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    loadBuilding();
  }, []);

  const handleClickToRoom = async () => {
    localStorage.setItem("selectPlace", "Room");
    localStorage.setItem("resetViewFromBuilding", true);
    localStorage.setItem("lat", lat);
    localStorage.setItem("lon", lon);
    window.location.reload(false);
  };

  const handleSubmit = async () => {
    localStorage.setItem("lat", lat);
    localStorage.setItem("lon", lon);
    localStorage.setItem("resetViewFromBuilding", true);
    localStorage.setItem("resetViewFromRoom", true);
    window.location.reload(false);
  };

  const handleMouseMove = (input, lat, lon) => {
    localStorage.setItem("buildingId", input);
    setLat(lat);
    setLon(lon);
  }
  const showBuilding = () => {
    if (!check) {
      const listOrders = building.map((object) => {
        return (
          <div className="blockForBuilding" onMouseMove={() => handleMouseMove(object._id, object.latitude, object.longitude)}>
            <div className="search-container" onClick={handleClickToRoom}>
            <img
              src= "https://img.freepik.com/premium-vector/building-logo-icon-design-template-vector_67715-555.jpg"
              width={50}
              height={50}
            />
              <div>
                <div>Name: {object.locationName}</div>
              </div>
            </div>
            <button onClick={handleSubmit}>click</button>
          </div>
        );
      });
      return <div>{listOrders}</div>;
    }else {
      return <div>Loading...</div>;
    }
  };

  return <>{showBuilding()}</>;
};

export default Building;
