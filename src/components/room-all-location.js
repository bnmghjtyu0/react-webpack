import * as React from "react";
import CustomInputNumber from "./custom-input-number";

/**
 * 產生數字遞增陣列 [0,1,2,3]
 * @param number -數字
 * @returns 回傳數字陣列
 */
const range = (number) => {
  return [...Array(number)].map((_, i) => i);
};

// ■ 調整 guest 跟 room 的數量確認顯示是否正常
// ■ 調整房間分配人數確認尚未分配人數顯示是否正常
// ■ onChange 不能收到 result 總合超過 guest 人數的值
const RoomAllLocation = (props) => {
  /**
   * guest 住客人數
   * room 房間數
   */
  const { guest = 10, room = 3, onChange } = props;
  const [state, setState] = React.useState([]);
  const auditsRef = React.useRef(range(room).map(() => React.createRef()));
  const childrenRef = React.useRef(range(room).map(() => React.createRef()));

  React.useEffect(() => {
    range(room).forEach(() => {
      setState((arr) => [...arr, { audit: 1, child: 0 }]);
    });
  }, room);

  /**
   * 住客人數是否小於等於房間數
   */
  const disabledA = React.useMemo(() => guest <= room, [guest, room]);
  const checkABC = React.useCallback(
    (state, numIndex) => {
      const people = state[numIndex].audit + state[numIndex].child;
      if (people >= room * 4) {
        auditsRef.current[numIndex].current.countRef.current.disabled = true;
        childrenRef.current[numIndex].current.countRef.current.disabled = true;
      } else {
        auditsRef.current[numIndex].current.countRef.current.disabled = false;
        childrenRef.current[numIndex].current.countRef.current.disabled = false;
      }
    },
    [childrenRef]
  );

  const hasOnChange = React.useMemo(
    () => onChange && typeof onChange === Function,
    [onChange]
  );

  return (
    <div className="room-all-location">
      {room >= 1 ? (
        range(room).map((num, numIndex) => {
          return (
            <div className="room-all-location-card" key={numIndex}>
              房間: 1 人
              <div className="d-flex">
                <p className="title">
                  大人 <span className="sub-title">年齡 20+</span>
                </p>
                <div className="right">
                  <CustomInputNumber
                    ref={auditsRef.current[numIndex]}
                    min={1}
                    max={10}
                    step={1}
                    name="a"
                    value={1}
                    disabled={disabledA}
                    onChange={(value) => {
                      state[numIndex].audit = Number(value);
                      setState(() => state);
                      hasOnChange && onChange(state);
                      checkABC(state, numIndex);
                    }}
                  />
                </div>
              </div>
              <div className="d-flex">
                <p className="title">小孩</p>
                <div className="right">
                  <CustomInputNumber
                    ref={childrenRef.current[numIndex]}
                    min={0}
                    max={10}
                    step={1}
                    name="a"
                    value={0}
                    disabled={disabledA}
                    onChange={(value) => {
                      state[numIndex].child = Number(value);
                      setState(() => state);
                      hasOnChange && onChange(state);
                      checkABC(state, numIndex);
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
