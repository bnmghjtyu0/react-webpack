import * as React from "react";

// ■ 點擊加號使 value 等於 max 時繼續點擊,確認 onChange 無後續觸發
// ■ 點擊減號使 value 等於 min 時繼續點擊,確認 onChange 無後續觸發
// ■ onBlur 時驗證是否為正確 Event.target.name 跟 Event.target.value
// ■ onChange 時驗證是否為正確 Event.target.name 跟 Event.target.value
// ■ disabled 等於 true 時,應無法改變或是輸入 value,且需有 disabled 樣
// 式
// ■ 調整 min 或 max 確認加減變化是否在範圍內
// ■ 調整 step 確認加減變化是否符合 step 間隔
const CustomInputNumber = React.forwardRef((props, ref) => {
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

  /** input:number */
  const countRef = React.useRef(0);

  React.useImperativeHandle(ref, () => ({
    countRef,
  }));

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
  const cut = () => {
    countRef.current.focus();
    if (countRef.current.value <= min || disabled) return;
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
      if (countRef.current.value >= max || disabled) return;
      countRef.current.value = Number(countRef.current.value) + step;
      onChange(countRef.current.value);
    }
    // 左鍵
    if (event.keyCode === 37) {
      if (countRef.current.value <= min || disabled) return;
      countRef.current.value = Number(countRef.current.value) - step;
      onChange(countRef.current.value);
    }
  };
  return (
    <div className="custom-input-number">
      <button className="btn" onClick={cut}>
        -
      </button>
      <input
        ref={countRef}
        type="number"
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
});

export default CustomInputNumber;
