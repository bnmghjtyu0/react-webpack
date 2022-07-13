import { Props, Result } from "./models/room-all-location";
import * as React from "react";
import RoomAllLocation from "./components/room-all-location";
import "./styles.scss";

/** 根元件 */
export default function App() {
  /** 房間預設資料 */
  const data: Props = { guest: 10, room: 3 };
  /** 預設每間房間至少有一個大人 */
  const peopleInit = data.room * 1;
  /** 回傳房間人數 */
  const [result, setResult] = React.useState<Result[]>([]);

  const people = React.useMemo(() => {
    if (result.length !== 0) {
      return result.reduce(
        (acc, curr) => acc + curr.audit + curr.child,
        -peopleInit
      );
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
          尚未分配人數 {data.guest - peopleInit - people} 人
        </p>
        <RoomAllLocation
          guest={data.guest}
          room={data.room}
          onChange={(results: Result[]) => {
            setResult(results);
          }}
        />
      </div>
    </div>
  );
}
