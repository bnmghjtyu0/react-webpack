import { AddFn, Props, SubtractFn } from "../models/custom-input-number";
import * as React from "react";

/**
 * 客製化數字 input
 */
const CustomInputNumber = (props: Props) => {
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
  const inputRef = React.useRef<any>(null);

  /**
   * 增加
   */
  const add: AddFn = () => {
    inputRef.current.focus();
    if (inputRef.current.value >= max || disabled) return;
    inputRef.current.value = Number(inputRef.current.value) + step;
    onChange(Number(inputRef.current.value));
  };

  /**
   * 減少
   */
  const subtract: SubtractFn = () => {
    inputRef.current.focus();
    if (inputRef.current.value <= min) return;
    inputRef.current.value = Number(inputRef.current.value) - step;
    onChange(Number(inputRef.current.value));
  };

  /**
   * 鍵盤
   * @param event - input 事件
   * @returns void
   */
  const handleKeyDown = (event: React.KeyboardEvent) => {
    // 右鍵
    if (event.key === "ArrowRight") {
      inputRef.current.focus();
      if (inputRef.current.value >= max || disabled) return;
      inputRef.current.value = Number(inputRef.current.value) + step;
      onChange(inputRef.current.value);
    }
    // 左鍵
    if (event.key === "ArrowLeft") {
      inputRef.current.focus();
      if (inputRef.current.value <= min) return;
      inputRef.current.value = Number(inputRef.current.value) - step;
      onChange(inputRef.current.value);
    }
  };

  return (
    <div className="custom-input-number">
      <button className="btn btn-subtract" onClick={subtract}>
        -
      </button>
      <input
        type="number"
        ref={inputRef}
        name={name}
        value={value}
        min={min}
        max={max}
        disabled={disabled}
        onBlur={onBlur}
        onChange={(event) => {
          onChange(Number(event.target.value));
        }}
        onKeyDown={(event: React.KeyboardEvent) => handleKeyDown(event)}
      />
      <button className="btn btn-add" onClick={add}>
        +
      </button>
    </div>
  );
};

export default CustomInputNumber;
