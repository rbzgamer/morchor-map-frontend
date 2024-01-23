import "./Room.css";
import { useEffect, useState } from "react";

const Room = () => {
  const [check, setChecked] = useState(true);
  const [room, setRoom] = useState([]);
  const buildingId = localStorage.getItem("buildingId");

  const loadRoom = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "http://localhost:5000/api/locations/rooms/" + buildingId,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setChecked(false);
        setRoom(result.rooms);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    loadRoom();
  }, []);

  const handleSubmit = async () => {
    localStorage.setItem("resetViewFromRoom", true);
    window.location.reload(false);
  };

  const showRoom = () => {
    if (!check) {
      const listOrders = room.map((object) => {
        return (
          <div className="blockFromRoom">
            <div className="search-container">
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/005/502/058/small/hexagon-room-box-line-logo-symbol-icon-graphic-design-illustration-idea-creative-vector.jpg"
                width={50}
                height={50}
              />
              <div>
                <div>{object}</div>
              </div>
            </div>
            <button onClick={handleSubmit}>click</button>
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