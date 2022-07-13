import * as React from "react";
import CustomInputNumber from "./custom-input-number";
import { range } from "../common/utils";
import { Props, Result, State } from "../models/room-all-location";

/** 房間元件 */
const RoomAllLocation = (props: Props) => {
  const { guest = 10, room = 3, onChange } = props;
  const [state, setState] = React.useState<State[]>([]);

  React.useEffect(() => {
    //依房間數量加入初始資料
    range(room).forEach(() => {
      setState((arr) => [...arr, { audit: 1, child: 0, disabled: false }]);
    });
  }, []);

  /** 住客人數是否小於等於房間數 */
  const checkHasRoom = React.useMemo(() => guest <= room, [guest, room]);

  /**
   * 切換 input
   * @param numIndex - 目前房間資料的索引
   */
  const handleChange = (numIndex: number): void => {
    //淺拷貝一份資料
    const stateCopy = [...state];
    // 房間人數: 大人+小孩
    const people = state[numIndex].audit + state[numIndex].child;
    // 四人房
    if (people >= 4) {
      stateCopy[numIndex].disabled = true;
    } else {
      stateCopy[numIndex].disabled = false;
    }
    // 更新資料
    setState(stateCopy);

    const totalPeople = state.reduce(
      (acc, curr) => acc + curr.audit + curr.child,
      0
    );
    //檢核: onChange 不能收到 result 總合超過 guest 人數的值
    if (totalPeople > guest) return;

    //傳遞資料到父層
    const newState: Result[] = stateCopy.map((data) => ({
      audit: data.audit,
      child: data.child,
    }));

    if (onChange) {
      onChange(newState);
    }
  };

  return (
    <div className="room-all-location">
      {state.length !== 0 ? (
        range(room).map((num) => {
          return (
            <div className="room-all-location-card" key={num}>
              <h4>房間: {state[num].audit + state[num].child} 人</h4>
              <div className="d-flex">
                <p className="title">
                  大人 <span className="sub-title">年齡 20+</span>
                </p>
                <div className="right">
                  <CustomInputNumber
                    min={1}
                    max={10}
                    step={1}
                    name="a"
                    value={state[num].audit}
                    disabled={state[num].disabled || checkHasRoom}
                    onChange={(value: Number) => {
                      // 更新房間大人的數量
                      state[num].audit = Number(value);
                      handleChange(num);
                    }}
                  />
                </div>
              </div>
              <div className="d-flex">
                <p className="title">小孩</p>
                <div className="right">
                  <CustomInputNumber
                    min={0}
                    max={10}
                    step={1}
                    name="a"
                    value={state[num].child}
                    disabled={state[num].disabled || checkHasRoom}
                    onChange={(value) => {
                      // 更新房間小孩的數量
                      state[num].child = Number(value);
                      // 檢查房間是否足夠
                      handleChange(num);
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div>沒有房間</div>
      )}
    </div>
  );
};

export default RoomAllLocation;
