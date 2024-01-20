import "./Building.css";
import { useEffect, useState } from "react";

const Building = () => {
  const [check, setChecked] = useState(true);
  const [building, setFaculty] = useState([]);
  const categoryName = localStorage.getItem("categoryName");

  const loadBuilding = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "http://localhost:5000/api/location/?category=" + categoryName,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
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
    window.location.reload(false);
  };

  const handleMouseMove = (input) => {
    localStorage.setItem("buildingName", input);
  }

  const showBuilding = () => {
    if (!check) {
      const listOrders = building.map((object) => {
        return (
          <div className="blockForBuilding" onMouseMove={() => handleMouseMove(object._id)} onClick={handleClickToRoom}>
            <div className="search-container">
              <img />
              <div>
                <div>Name: {object.locationName}</div>
              </div>
            </div>
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
