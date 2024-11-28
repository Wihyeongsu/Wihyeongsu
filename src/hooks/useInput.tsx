import { ChangeEvent, useState } from "react";

export const useInput = <T extends string | number>(
  initialValue: T,
  validator?: (value: T) => boolean,
): [T, (e: ChangeEvent<HTMLInputElement>) => void] => {
  const [value, setValue] = useState<T>(initialValue);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    let { value: newValue } = e.target;

    if (typeof initialValue === "number") {
      // Remove all non-numeric characters
      newValue = newValue.replace(/[^0-9]/g, "");
    }

    // We need to handle type conversion here
    // This is a safeguard for different types of inputs
    const convertedValue = (
      typeof initialValue === "number" ? Number(newValue) : newValue
    ) as T;

    let willUpdate = true;
    if (validator) {
      willUpdate = validator(convertedValue);
    }
    if (willUpdate) {
      setValue(convertedValue);
    }
  };
  return [value, onChange];
};
