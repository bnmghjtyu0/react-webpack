import * as React from "react";

const CustomInputNumber = (props) => {
  const {
    min,
    max,
    step = 1,
    name,
    value = 0,
    disabled,
    onBlur,
    onChange,
  } = props;
  const countRef = React.useRef(0);

  const add = () => {
    if (countRef.current.value >= max || disabled) return;
    countRef.current.value = Number(countRef.current.value) + step;
    countRef.current.focus();
  };
  const cut = () => {
    if (countRef.current.value <= min || disabled) return;
    countRef.current.value = Number(countRef.current.value) - step;
    countRef.current.focus();
  };

  const handleKeyDown = (event) => {
    // 右鍵
    if (event.keyCode === 39) {
      if (countRef.current.value >= max || disabled) return;
      countRef.current.value = Number(countRef.current.value) + step;
    }
    // 左鍵
    if (event.keyCode === 37) {
      if (countRef.current.value <= min || disabled) return;
      countRef.current.value = Number(countRef.current.value) - step;
    }
  };
  return (
    <div className="custom-input-number">
      <button className="btn" onClick={cut}>
        -
      </button>
      <input
        type="number"
        name={name}
        ref={countRef}
        value={value}
        min={min}
        max={max}
        disabled={disabled}
        onBlur={onBlur}
        onChange={(e) => {
          onChange();
        }}
        onKeyDown={handleKeyDown}
      />
      <button className="btn btn-add" onClick={add}>
        +
      </button>
    </div>
  );
};

export default CustomInputNumber;
