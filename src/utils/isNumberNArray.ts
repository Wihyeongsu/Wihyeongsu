export function isNumberNArray(
  tuple: any,
  n: number,
): tuple is [number, number] {
  return (
    Array.isArray(tuple) &&
    tuple.length === n &&
    tuple.every((p) => typeof p === "number")
  );
}
