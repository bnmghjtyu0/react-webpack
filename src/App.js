import * as React from "react";
import RoomAllLocation from "./components/room-all-location";
import "./styles.scss";
export default function App() {
  const data = { guest: 10, room: 3 };

  const [result, setResult] = React.useState([]);

  const people = React.useMemo(() => {
    if (result.length !== 0) {

      return result.reduce((acc, curr) => acc + curr.audit + curr.child, 0);
    } else {
      return 0;
    }
  }, [result]);

  return (
    <div className="App">
      <div className="room-app">
        <h4 className="room-app-title">
          <span>住客人數 {data.guest} 人</span> / <span>{data.room} 房</span>
        </h4>

        <p className="alert alert-primary mt-3">
          尚未分配人數 {data.guest - people} 人
        </p>
        <RoomAllLocation
          guest={data.guest}
          room={data.room}
          onChange={(result) => {
            console.log(result)
            setResult(result);
          }}
        />
      </div>
    </div>
  );
}
