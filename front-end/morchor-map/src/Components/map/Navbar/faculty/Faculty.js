import { useEffect, useState } from "react";
import Building from "../building/Building";
import Room from "../room/Room";
import "./Faculty.css"

const Faculty = () => {
  const [check, setChecked] = useState(true);
  let token = localStorage.getItem("selectPlace");

  const faculty = async () => {
    setChecked(false);
  };

  useEffect(() => {
    Room();
    Building();
    faculty();

    if(token == null) {
      token = "Faculty"
      localStorage.setItem("selectPlace", "Faculty")
    }
  }, token);

  const handleClickToBuilding = async () => {
    localStorage.setItem("selectPlace", "Building")
    window.location.reload(false);
  };

  const fac = () => {
    if (!check) {
      const data = [
        { name: "Faculty of Engineering", age: 28, city: "HO" },
        { name: "Faculty of Architecture ", age: 82, city: "HN" },
        { name: "Faculty of Agriculture", age: 41, city: "IT" },
        { name: "Faculty of Economics", age: 28, city: "HO" },
        { name: "Faculty of Mas Communication", age: 82, city: "HN" },
        { name: "Faculty of Nursing", age: 41, city: "IT" },
        { name: "Faculty of Medicine", age: 28, city: "HO" },
        { name: "Faculty of Education", age: 82, city: "HN" },
        { name: "Faculty of Humanities", age: 41, city: "IT" },
        { name: "Faculty of Law", age: 82, city: "HN" },
        { name: "Faculty of Science", age: 41, city: "IT" },

        // { name: "Faculty of Engineering", age: 28, city: "HO" },
        // { name: "Faculty of Architecture ", age: 82, city: "HN" },
        // { name: "Faculty of Agriculture", age: 41, city: "IT" },
        // { name: "Faculty of Economics", age: 28, city: "HO" },
        // { name: "Faculty of Mas Communication", age: 82, city: "HN" },
        // { name: "Faculty of Nursing", age: 41, city: "IT" },
        // { name: "Faculty of Medicine", age: 28, city: "HO" },
        // { name: "Faculty of Education", age: 82, city: "HN" },
        // { name: "Faculty of Humanities", age: 41, city: "IT" },
        // { name: "Faculty of Law", age: 82, city: "HN" },
        // { name: "Faculty of Science", age: 41, city: "IT" },
      ];
      const listOrders = data.map((object) => {
        return (
          <button type="submit" className="blockForFaculty">
            <div className="search-container">
              <img />
              <div onClick={handleClickToBuilding}>
                <div>{object.name}</div>
                <div>{object.city}</div>
              </div>
            </div>
          </button>
        );
      });
      return <div>{listOrders}</div>;
    } else {
      return <div>Loading...</div>;
    }
  };

  const render = () => {
    switch (token) {
      case "Faculty":
        return (
          <>
            {fac()}
          </>
        );

      case "Building":
        return (
          <div>
            {Building()}
          </div>
        );

      case "Room":
        return (
          <>
            {Room()}
          </>
        );

      default:
        return <div>Loading...</div>;
    }
  };

  return <div className="">{render()}</div>;
};

export default Faculty;
