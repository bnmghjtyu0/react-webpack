import * as React from "react";
import CustomInputNumber from "./custom-input-number";
import { range } from "../common/utils";

/**
 * 房間
 * @param props - guest 住客人數, room 房間數, onChange 回傳結果
 */
const RoomAllLocation = (props) => {
  const { guest = 10, room = 3, onChange } = props;
  const [state, setState] = React.useState([]);

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
   */
  const handleChange = (state, numIndex) => {
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
    const newState = stateCopy.map((data) => ({
      audit: data.audit,
      child: data.child,
    }));
    onChange(newState);
  };

  return (
    <div className="room-all-location">
      {state.length !== 0 ? (
        range(room).map((num, numIndex) => {
          return (
            <div className="room-all-location-card" key={numIndex}>
              <h4>房間: {state[numIndex].audit + state[numIndex].child} 人</h4>
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
                    value={state[numIndex].audit}
                    disabled={state[numIndex].disabled || checkHasRoom}
                    onChange={(value) => {
                      // 更新房間大人的數量
                      state[numIndex].audit = Number(value);
                      handleChange(state, numIndex);
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
                    value={state[numIndex].child}
                    disabled={state[numIndex].disabled || checkHasRoom}
                    onChange={(value) => {
                      // 更新房間小孩的數量
                      state[numIndex].child = Number(value);
                      // 檢查房間是否足夠
                      handleChange(state, numIndex);
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
