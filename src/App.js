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
      <div className="wrap">
        尚未分配人數 {people} 人
        <RoomAllLocation
          guest={data.guest}
          room={data.room}
          onChange={(result) => {
            setResult(result);
          }}
        />
      </div>
    </div>
  );
}
