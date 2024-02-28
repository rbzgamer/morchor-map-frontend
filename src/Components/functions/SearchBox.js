import React, { useState } from "react";
import {
  List,
  Button,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
const params = {
  q: "",
  format: "json",
  addressdetails: "addressdetails",
};

export default function SearchBox(props) {
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

          {/* <div>
            <List component="nav" aria-label="main mailbox folders">
              {listPlace.map((item) => {
                return (
                  <div key={item?.place_id}>
                    <ListItem
                      button
                      onClick={() => {
                        setSelectPosition(item);
                      }}
                    >
                      <ListItemIcon>
                        <img
                          src="./placeholder.png"
                          alt="Placeholder"
                          style={{ width: 38, height: 38 }}
                        />
                      </ListItemIcon>
                      <ListItemText primary={item?.display_name} />
                    </ListItem>
                    <Divider />
                  </div>
                );
              })}
            </List>
          </div> */}
        </form>
      </div>
    </>
  );
}
