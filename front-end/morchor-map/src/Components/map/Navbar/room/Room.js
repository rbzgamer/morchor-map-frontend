import "./Room.css"

const Room = () => {
    const room = () => {
      const data = [
        { name: "401", age: 28, city: "HO" },
        { name: "402 ", age: 82, city: "HN" },
        { name: "412", age: 41, city: "IT" },
        { name: "516", age: 28, city: "HO" },
        { name: "521", age: 82, city: "HN" },
      ];
      const listOrders = data.map((object) => {
        return (
          <div className="blockFromRoom">
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
    };
  
    return (
      <>
        {room()}
      </>
    );
  };
  
  export default Room;
  