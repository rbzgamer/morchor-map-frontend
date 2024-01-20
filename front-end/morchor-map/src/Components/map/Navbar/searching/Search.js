import "./Search.css";
import { useEffect, useState } from "react";

const Search = () => {
  const [check, setChecked] = useState(true);
  const [search, setSearch] = useState([]);
  const searchData = localStorage.getItem("search");

  const loadSearch = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "http://localhost:5000/api/location/?locationName=" + searchData,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setSearch(result);
        setChecked(false);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    loadSearch();
  }, []);

  const showSearch = () => {
    if (!check) {
      const listOrders = search.map((object) => {
        return (
          <div className="blockForBuilding">
            <div className="search-container">
              <img />
              <div>
                <div>Category: {object.category}</div>
                <div>Name: {object.locationName}</div>
                <div>Room: {object.room}</div>
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
  return <>{showSearch()}</>;
};

export default Search;
