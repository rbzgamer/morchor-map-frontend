import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import "./Navbar.css";
import { Faculty } from "./faculty/Faculty";
import { Search } from "./searching/Search";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
const params = {
  q: "",
  format: "json",
  addressdetails: "addressdetails",
};

export const Navbar = ({ setResults, setApprove, setSubmit, results}) => {
  const [searchText, setSearchText] = useState("");
  const [holderSearch, setHolderSearch] = useState("Search...");

  useEffect(() => {
    if (results !== "") {
      setHolderSearch(results);
    }
  }, []);


  const handleSubmit = () => {
    if (searchText !== "") {
      setApprove(true);
    }
  };

  const handleClear = async () => {
    setSearchText("");
    setApprove(false);
    setSubmit(false)
  };

  return (
    <>
      <div>
        Morchor Map
        <form id="form">
          <div className="search-container">
            <input
              type="text"
              className="input"
              id="start"
              placeholder={holderSearch}
              value={searchText}
              onChange={(event) => {
                setSearchText(event.target.value);
                setResults(searchText);
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
      </div>
    </>
  );
};
