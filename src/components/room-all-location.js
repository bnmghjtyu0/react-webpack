import * as React from "react";
import CustomInputNumber from "./custom-input-number";
const RoomAllLocation = (props) => {
  const { guest = 0, room = 3, onChange } = props;
  return (
    <div className="room-all-location">
      房間: 1 人
      <div className="d-flex">
        <p className="title">
          大人 <span className="sub-title">年齡 20+</span>
        </p>
        <div className="right">
          <CustomInputNumber
            min={0}
            max={10}
            step={1}
            name="a"
            value={0}
            disabled={false}
        
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
            value={0}
            disabled={false}
          />
        </div>
      </div>
    </div>
  );
};

export default RoomAllLocation;
