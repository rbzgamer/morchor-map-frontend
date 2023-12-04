import { useEffect, useState } from "react";

const Faculty = () => {
  const [check, setChecked] = useState(true);

  const faculty = async () => {
    setChecked(false);
  };

  useEffect(() => {
    faculty();
  }, []);

  const render = () => {
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
      ];
      const listOrders = data.map((object) => {
        return (
          <div className="block">
            <div className="search-container">
              <img />
              <div>
                <div>{object.name}</div>
                <div>{object.city}</div>
              </div>
            </div>
          </div>
        );
      });
      return <div>{listOrders}</div>;
    } else {
      return (
        <div className="block">
          <div className="search-container">
            <img />
            <div>
              <div>Faculty of Engineering</div>
              <div>ddd</div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      Category by Faculty
      {render()}
    </>
  );
};

export default Faculty;
