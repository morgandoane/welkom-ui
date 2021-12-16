export const chunkify = <T>(a: T[], size: number): Array<Array<T>> => {
  const arrays: T[][] = [];
  const copy = [...a];

  while (copy.length > 0) arrays.push(copy.splice(0, size));

  return arrays;
};
