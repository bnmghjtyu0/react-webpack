/** 客製化數字 input Props*/
export interface Props {
  /** 最小值 */
  min: number;
  /** 最大值 */
  max: number;
  /** 步驟 */
  step: number;
  /** 名稱 */
  name: string;
  /** 值 */
  value: number;
  /** 禁用 */
  disabled: boolean;
  /** 離開焦點時 */
  onBlur?: () => void;
  /** 變更事件 */
  onChange: (value: number) => void;
}

/** 增加 */
export type AddFn = () => void;
/** 減少 */
export type SubtractFn = () => void;
