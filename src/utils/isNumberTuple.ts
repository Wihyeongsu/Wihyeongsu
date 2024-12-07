export function isNumberTuple(tuple: any): tuple is [number, number] {
  return (
    Array.isArray(tuple) &&
    tuple.length === 2 &&
    tuple.every((p) => typeof p === "number")
  );
}
