/** 回傳房間人數 */
export interface Result {
  /** audit: 大人 */
  audit: number;
  /** child: 小孩 */
  child: number;
}

/** 房間資料。繼承房間人數 */
export interface State extends Result {
  /** disabled: 禁止使用 */
  disabled: boolean;
}

/** RoomAllLocation Props */
export interface Props {
  /** guest: 住客人數 */
  guest: number;
  /** room: 房間數 */
  room: number;
  /** onChange: 回傳結果 */
  onChange?: (result: Result[]) => void;
}
