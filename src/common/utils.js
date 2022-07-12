/**
 * 產生數字遞增陣列 [0,1,2,3]
 * @param number -數字
 * @returns 回傳數字陣列
 */
export const range = (number) => {
  return [...Array(number)].map((_, i) => i);
};
