import * as React from "react";

/**
 * 客製化數字 input
 */
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

  /** 數字 input ref */
  const countRef = React.useRef(0);

  /**
   * 增加
   */
  const add = () => {
    countRef.current.focus();
    if (countRef.current.value >= max || disabled) return;
    countRef.current.value = Number(countRef.current.value) + step;
    onChange(countRef.current.value);
  };

  /**
   * 減少
   */
  const subtract = () => {
    countRef.current.focus();
    if (countRef.current.value <= min) return;
    countRef.current.value = Number(countRef.current.value) - step;
    onChange(countRef.current.value);
  };

  /**
   * 鍵盤
   * @param event - input 事件
   * @returns void
   */
  const handleKeyDown = (event) => {
    // 右鍵
    if (event.keyCode === 39) {
      countRef.current.focus();
      if (countRef.current.value >= max || disabled) return;
      countRef.current.value = Number(countRef.current.value) + step;
      onChange(countRef.current.value);
    }
    // 左鍵
    if (event.keyCode === 37) {
      countRef.current.focus();
      if (countRef.current.value <= min) return;
      countRef.current.value = Number(countRef.current.value) - step;
      onChange(countRef.current.value);
    }
  };

  return (
    <div className="custom-input-number">
      <button className="btn btn-subtract" onClick={subtract}>
        -
      </button>
      <input
        type="number"
        ref={countRef}
        name={name}
        value={value}
        min={min}
        max={max}
        disabled={disabled}
        onBlur={onBlur}
        onChange={(event) => {
          onChange(event.target.value);
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
