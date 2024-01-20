import { useEffect, useState } from "react";
import Building from "../building/Building";
import Room from "../room/Room";
import "./Faculty.css";

const Faculty = () => {
  const [check, setChecked] = useState(true);
  const [faculty, setFaculty] = useState([]);
  let token = localStorage.getItem("selectPlace");

  const loadFaculty = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:5000/api/location/categories", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.categories);
        setChecked(false);
        setFaculty(result.categories)
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    loadFaculty();

    if (token == null) {
      token = "Faculty";
      localStorage.setItem("selectPlace", "Faculty");
    }
  }, [token]);

  const handleClickToBuilding = async () => {
    localStorage.setItem("selectPlace", "Building");
    window.location.reload(false);
  };

  const handleMouseMove = (input) => {
    localStorage.setItem("categoryName", input);
  }

  const showFaculty = () => {
    if (!check) {
      const listOrders = faculty.map((object) => {
        return (
          <button type="submit" className="blockForFaculty" onMouseMove={() => handleMouseMove(object)} onClick={handleClickToBuilding}>
            <div className="search-container">
            <img src="https://me.eng.cmu.ac.th/img/logo-me.jpg"  width={50} height={50} />
              <div>
                <div>{object}</div>
              </div>
            </div>
          </button>
        );
      });
      return <div>{listOrders}</div>;
    } else {
      return <div>Loading...</div>;
    }
  };

  const render = () => {
    switch (token) {
      case "Faculty":
        return <>{showFaculty()}</>;

      case "Building":
        return <div>{Building()}</div>;

      case "Room":
        return <>{Room()}</>;

      default:
        return <div>Loading...</div>;
    }
  };

  return <div className="">{render()}</div>;
};

export default Faculty;
