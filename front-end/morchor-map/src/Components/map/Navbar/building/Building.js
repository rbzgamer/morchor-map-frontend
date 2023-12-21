import "./Building.css"

const Building = () => {
  const handleClickToRoom = async () => {
    localStorage.setItem("selectPlace", "Room")
    window.location.reload(false);
  };

  const building = () => {
    const data = [
      { name: "อาคาร 30 ปี", age: 28, city: "HO" },
      { name: "อาคารวิศวกรรมสำรวจ", age: 82, city: "HN" },
      { name: "อาคารเครื่องกล 1", age: 41, city: "IT" },
      { name: "อาคารเครื่องกล 2", age: 28, city: "HO" },
      { name: "อาคารเครื่องกล 3", age: 82, city: "HN" },
      { name: "อาคารเครื่องกล 4", age: 82, city: "HN" },
      { name: "สนามฮอกกี้ มช.", age: 28, city: "HO" },
      { name: "โรงประลองวิศวกรรมแหล่งน้ำ", age: 82, city: "HN" },
      { name: "โรงประลองวิศวกรรมโครงสร้าง", age: 28, city: "HO" },
      { name: "อาคารบัณฑิตศึกษาวิศวกรรมโยธา", age: 82, city: "HN" },
      { name: "โรงฝึกงาน", age: 82, city: "HN" },
      { name: "อาคารวิจัยและถ่ายทอดเทคโนโลยี", age: 28, city: "HO" },
    ];
    const listOrders = data.map((object) => {
      return (
        <div className="blockForBuilding">
          <div className="search-container">
            <img />
            <div onClick={handleClickToRoom}>
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
      {building()}
    </>
  );
};

export default Building;
