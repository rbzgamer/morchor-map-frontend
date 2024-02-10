import "./Building.css";
import { useEffect, useState } from "react";

import { Box, IconButton, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export const Building = ({
  setChoose,
  setSelectBuilding,
  selectFaculty,
  setLatitudeFromLocation,
  setLongitudeFromLocation,
  setSubmit,
  setSelectFaculty,
  open,
}) => {
  const [check, setChecked] = useState(true);
  const [building, setFaculty] = useState([]);
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [select, setSelect] = useState("");

  const loadBuilding = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "http://localhost:5000/api/locations/?category=" + selectFaculty,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setChecked(false);
        setFaculty(result);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    loadBuilding();
  }, []);

  const handleClickToRoom = async () => {
    setLatitudeFromLocation(lat);
    setLongitudeFromLocation(lon);
    setSelectBuilding(select);
    setChoose("Room");
  };

  const handleGoBack = async () => {
    setSubmit(false);
    setChoose("Faculty");
    setSelectFaculty("");
  };

  const handleSubmit = async () => {
    setSubmit(true);
    setLatitudeFromLocation(lat);
    setLongitudeFromLocation(lon);
  };

  const handleMouseMove = (input, lat, lon) => {
    setLat(lat);
    setLon(lon);
    setSelect(input);
  };
  const showBuilding = () => {
    if (!check) {
      const listOrders = building.map((object) => {
        return (
          <div
            className="blockForBuilding"
            onMouseMove={() =>
              handleMouseMove(object._id, object.latitude, object.longitude)
            }
          >
            <div className="search-container" onClick={handleClickToRoom}>
              <img
                src="https://img.freepik.com/premium-vector/building-logo-icon-design-template-vector_67715-555.jpg"
                width={50}
                height={50}
              />
              <div>
                <div>Name: {object.locationName}</div>
              </div>
            </div>
            <IconButton
              color="primary"
              sx={{ p: "10px" }}
              aria-label="directions"
              onClick={handleSubmit}

              style={{right: "0px"}}
            >
              <SendIcon />
            </IconButton>
          </div>
        );
      });
      return <div>{listOrders}</div>;
    } else {
      return <div>Loading...</div>;
    }
  };

  return (
    <>
      <button type="submit" onClick={handleGoBack} className="rollbackButton">
        Click Here!!
      </button>
      {open && showBuilding()}
    </>
  );
};
