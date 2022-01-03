export const relocate = <T>(
  arr: T[],
  fromIndex: number,
  toIndex: number
): T[] => {
  const element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
  return arr;
};
