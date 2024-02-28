import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Navbar.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import {
  AppBar,
  Box,
  Divider,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import DirectionsIcon from "@mui/icons-material/Directions";

export const Navbar = ({
  setResults,
  setApprove,
  setSubmit,
  setUseRoute,
  open,
  setOpen,
  openDirectionBar,
  setOpenDirectionBar,
  setChoose,
  setSelectFaculty,
  choose,
  setOriginName,
  setDestinationName,
  latitudeFromUser,
  longitudeFromUser,
  setOriginLat,
  setOriginLng,
  useRoute,
}) => {
  const [searchText, setSearchText] = useState("");

  const handleSubmit = () => {
    if (searchText !== "") {
      setApprove(true);
    }
  };

  const handleClear = async () => {
    setSearchText("");
    setApprove(false);
    setSubmit(false);
    setUseRoute(false);
    setOriginName("User Location");
    setDestinationName("Destination");
    setOriginLat(latitudeFromUser);
    setOriginLng(longitudeFromUser);

    if (useRoute) {
      window.location.reload(false);
    }
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleOpenDirectionBar = () => {
    setOpenDirectionBar(!openDirectionBar);
  };

  const handleGoBack = () => {
    setSubmit(false);
    if (choose === "Building") {
      setChoose("Faculty");
      setSelectFaculty("");
    } else {
      setChoose("Building");
    }
  };

  return (
    <>
      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 510 }}
      >
        {choose !== "Faculty" && (
          <>
            {" "}
            <IconButton color="black" onClick={handleGoBack}>
              <ArrowBackIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          </>
        )}
        <IconButton sx={{ p: "10px" }} aria-label="menu" onClick={handleOpen}>
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          color="inherit"
          component="div"
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        >
          Morchor Map
        </Typography>
        <InputBase
          sx={{ mt: 1.5, flex: 1 }}
          placeholder="Search"
          inputProps={{ "aria-label": "search google maps" }}
          value={searchText}
          onChange={(event) => {
            setSearchText(event.target.value);
            setResults(searchText);
          }}
        />
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={handleSubmit}
        >
          <SearchIcon />
        </IconButton>
        <IconButton color="error" onClick={handleClear}>
          <DeleteIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          color="primary"
          sx={{ p: "10px" }}
          aria-label="directions"
          onClick={handleOpenDirectionBar}
        >
          <DirectionsIcon />
        </IconButton>
      </Paper>
    </>
  );
};
