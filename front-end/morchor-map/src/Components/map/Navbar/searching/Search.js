import "./Search.css";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";

const Search = () => {
  const [check, setChecked] = useState(true);
  const [search, setSearch] = useState([]);
  const searchData = localStorage.getItem("search");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");

  const loadSearch = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "http://localhost:5000/api/locations/?locationName=" + searchData,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setSearch(result);
        setChecked(false);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    loadSearch();
  }, []);

  const handleSubmit = async () => {
    localStorage.setItem("lat", lat);
    localStorage.setItem("lon", lon);
    window.location.reload(false);
  };

  const handleMouseMove = async (lat, lon) => {
    setLat(lat);
    setLon(lon);
  };

  const showSearch = () => {
    if (!check) {
      const listOrders = search.map((object) => {
        return (
          <div
            className="blockForBuilding"
            onMouseMove={() =>
              handleMouseMove(object.latitude, object.longitude)
            }
          >
            <div className="search-container">
              <div>
                <div>Category: {object.category}</div>
                <div>Name: {object.locationName}</div>
                <div>Room: {object.room}</div>
              </div>
              <Button
                variant="contained"
                color="primary"
                style={{ right: "0px" }}
                onClick={() => handleSubmit()}
              >
                click
              </Button>
            </div>
          </div>
        );
      });
      return <div>{listOrders}</div>;
    } else {
      return <div>Loading...</div>;
    }
  };
  return <>{showSearch()}</>;
};

export default Search;
