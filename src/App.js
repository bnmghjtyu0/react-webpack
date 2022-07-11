import * as React from "react";
import RoomAllLocation from "./components/room-all-location";
import "./styles.scss";
export default function App() {
  return (
    <div className="App">
      <div className="wrap">
        <RoomAllLocation
          guest={10}
          room={3}
          // onChange={(result) => {
          //   console.log(result);
          // }}
        />
      </div>
    </div>
  );
}
