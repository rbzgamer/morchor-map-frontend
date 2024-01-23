import { useEffect, useState } from "react";
import Building from "../building/Building";
import Room from "../room/Room";
import "./Faculty.css";

export const Faculty = ({setChoose, setSelectFaculty}) => {
  const [select, setSelect] = useState("");
  const [check, setChecked] = useState(true);
  const [faculty, setFaculty] = useState([]);

  const loadFaculty = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:5000/api/locations/categories", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setChecked(false);
        setFaculty(result.categories);
      })
      .catch((error) => console.log("error", error));
  };



  const handleClickToBuilding = async () => {
    setChoose("Building")
    setSelectFaculty(select)
  };

  const handleMouseMove = (input) => {
    setSelect(input)
  };

  const showFaculty = () => {
    if (!check) {
      const listOrders = faculty.map((object) => {
        let img = ""
        if (object === "Engineering") {
          img = (
            <img
              src="https://me.eng.cmu.ac.th/img/logo-me.jpg"
              width={50}
              height={50}
            />
          );
        } else if (object === "Architecture") {
          img = (
            <img
              src="https://www.arc.cmu.ac.th/dept/img/archcmu_logo_color.png"
              width={50}
              height={50}
            />
          );
        } else if (object === "Agriculture") {
          img = (
            <img
              src="https://www.agri.cmu.ac.th/2017/img/logo/logo_agri_cmu_thai_2012.gif"
              width={50}
              height={50}
            />
          );
        }

        return (
          <button
            type="submit"
            className="blockForFaculty"
            onMouseMove={() => handleMouseMove(object)}
            onClick={handleClickToBuilding}
          >
            <div className="search-container">
              {img}
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

  // const render = () => {
  //   switch (token) {
  //     case "Faculty":
  //       return <>{showFaculty()}</>;

  //     case "Building":
  //       return <div>{Building()}</div>;

  //     case "Room":
  //       return <>{Room()}</>;

  //     default:
  //       return <div>Loading...</div>;
  //   }
  // };

  return <div className="">{showFaculty()}</div>;
};
