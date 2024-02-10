import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Navbar.css";

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
  results,
  setUseRoute,
  open,
  setOpen,
  openDirectionBar,
  setOpenDirectionBar
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
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleOpenDirectionBar = () => {
    setOpenDirectionBar(!openDirectionBar)
  }

  return (
    <>
      {/* <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
                onClick={handleOpen}
              >
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

              <Search
                style={{ display: "flex" }}
                placeholder={holderSearch}
                value={searchText}
                onChange={(event) => {
                  setSearchText(event.target.value);
                  setResults(searchText);
                }}
              >
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  // placeholder={holderSearch}
                  inputProps={{ "aria-label": "search" }}
                />
                <IconButton color="success" onClick={handleSubmit}>
                  <SendIcon />
                </IconButton>
                <IconButton color="error" onClick={handleClear}>
                  <DeleteIcon />
                </IconButton>
              </Search>
            </Toolbar>
          </AppBar>
        </Box> */}

      {/* <form id="form">
          <div className="search-container">
            <TextField
              fullWidth
              label="Search"
              variant="outlined"
              size="small"
              placeholder={holderSearch}
              value={searchText}
              onChange={(event) => {
                setSearchText(event.target.value);
                setResults(searchText);
              }}
            />
            <ButtonGroup variant="contained">
              <IconButton color="success" onClick={handleSubmit}>
                <SendIcon />
              </IconButton>
              <IconButton color="error" onClick={handleClear}>
                <DeleteIcon />
              </IconButton>
            </ButtonGroup>
          </div>
        </form> */}

      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 510 }}
      >
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
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search" onClick={handleSubmit}>
          <SearchIcon />
        </IconButton>
        <IconButton color="error" onClick={handleClear}>
          <DeleteIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="primary" sx={{ p: "10px" }} aria-label="directions" onClick={handleOpenDirectionBar}>
          <DirectionsIcon />
        </IconButton>
      </Paper>
    </>
  );
};
