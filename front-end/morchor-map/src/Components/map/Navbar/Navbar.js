import React, { useEffect, useState } from "react";
import {
  List,
  Button,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import "./Navbar.css";
import Faculty from "./faculty/Faculty";
import Place from "./place/Place";


const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
const params = {
  q: "",
  format: "json",
  addressdetails: "addressdetails",
};

const Navbar = (props) => {
  const { selectPosition, setSelectPosition } = props;
  const [searchText, setSearchText] = useState("");
  const [listPlace, setListPlace] = useState([]);

  return (
    <>
      <div className="formBlock">
        Morchor Map
        <form id="form">
          <div className="search-container">
            <input
              type="text"
              className="input"
              id="start"
              placeholder="Search..."
              value={searchText}
              onChange={(event) => {
                setSearchText(event.target.value);
              }}
            />
            <Button
              variant="contained"
              color="primary"
              style={{ top: "10px" }}
              onClick={() => {
                // Search
                const params = {
                  q: searchText,
                  format: "json",
                  addressdetails: 1,
                  polygon_geojson: 0,
                };
                const queryString = new URLSearchParams(params).toString();
                const requestOptions = {
                  method: "GET",
                  redirect: "follow",
                };
                fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
                  .then((response) => response.text())
                  .then((result) => {
                    setListPlace(JSON.parse(result));
                  })
                  .catch((err) => console.log("err: ", err));
              }}
            >
              Search
            </Button>
          </div>
        </form>

        {/* {Faculty()} */}

        {Place("Faculty of Engineering")}
      </div>
    </>
  );
};

export default Navbar;
