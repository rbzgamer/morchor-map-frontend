import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import "./Navbar.css";
import Faculty from "./faculty/Faculty";
import Search from "./searching/Search";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
const params = {
  q: "",
  format: "json",
  addressdetails: "addressdetails",
};

const Navbar = (props) => {
  const { selectPosition, setSelectPosition } = props;
  const [searchText, setSearchText] = useState("");
  const token = localStorage.getItem("selectPlace");
  const [nameOfCategory, setNameOfCategory] = useState("");
  const [holderSearch, setHolderSearch] = useState("Search...");
  let search = localStorage.getItem("search");

  useEffect(() => {
    if (token === "Faculty") setNameOfCategory("Category by Faculty");
    else if (token === "Building") setNameOfCategory("Category by Building");
    else if (token === "Room") setNameOfCategory("Category by Room");

    if (search !== "") {
      setHolderSearch(search)
    }
  }, []);

  const handleGoBack = () => {
    if (token === "Building") {
      localStorage.setItem("selectPlace", "Faculty");
      localStorage.setItem("filter", false);
      localStorage.setItem("resetViewFromBuilding", false);
      localStorage.setItem("lat", "");
      localStorage.setItem("lon", "");
      window.location.reload(false);
    } else if (token === "Room") {
      localStorage.setItem("selectPlace", "Building");
      localStorage.setItem("resetViewFromRoom", false);
      window.location.reload(false);
    }
  };

  const handleSubmit = async () => {
    if (searchText !== "") {
      localStorage.setItem("search", searchText);
      window.location.reload(false);
    }
  };

  const handleClear = async () => {
    localStorage.setItem("search", "");
    localStorage.setItem("lat", "");
    localStorage.setItem("lon", "");
    setSearchText("");
    window.location.reload(false);
  };

  const handleCheckSearch = () => {
    if (search === "") {
      return (
        <>
          <div style={{ display: "block" }}>{nameOfCategory}</div>
          <div className="attribute">{Faculty()}</div>
        </>
      );
    } else {
      return (
        <>
          <div className="attribute">{Search()}</div>
        </>
      );
    }
  };

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
              placeholder= {holderSearch}
              value={searchText}
              onChange={(event) => {
                setSearchText(event.target.value);
              }}
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Search
            </Button>
            <Button variant="contained" color="primary" onClick={handleClear}>
              clear
            </Button>
          </div>
        </form>
        <button type="submit" onClick={handleGoBack} className="rollbackButton">
          Click Here!!
        </button>
        <>{handleCheckSearch()}</>
      </div>
    </>
  );
};

export default Navbar;
