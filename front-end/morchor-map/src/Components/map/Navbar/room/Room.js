import "./Room.css";
import { useEffect, useState } from "react";

const Room = () => {
  const [check, setChecked] = useState(true);
  const [room, setRoom] = useState([]);
  const buildingName = localStorage.getItem("buildingName");

  const loadRoom = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "http://localhost:5000/api/location/?category=" + buildingName,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setChecked(false);
        setRoom(result);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    loadRoom();
  }, []);

  const showRoom = () => {
    if (!check) {
      const markers = [
        {
          id: 0,
          geocode: [18.795612015074767, 98.95285065288007],
          popUp: "ตึก 30 ปี",
        },
        {
          id: 1,
          geocode: [18.801588909598827, 98.95336653591599],
          popUp: "SCB 1",
        },
        {
          id: 2,
          geocode: [18.797201944092684, 98.95183596448591],
          popUp: "หอ 5 ชาย",
        },
      ];
      const listOrders = data.map((object) => {
        return (
          <div className="blockFromRoom">
            <div className="search-container">
              <img />
              <div>
                <div>{object.name}</div>
                <div>{object.city}</div>
              </div>
            </div>
          </div>  
        );
      });
      return <div>{listOrders}</div>;
    } else {
      return <div>Loading...</div>;
    }
  };

  return <>{showRoom()}</>;
};

export default Room;
