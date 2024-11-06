import React, { useCallback, useState } from "react";

interface CounterProps {
  initialCount: number;
  onCountUpdate: (count: number) => void;
}

const Counter: React.FC<CounterProps> = ({ initialCount, onCountUpdate }) => {
  const [count, setCount] = useState<number>(initialCount);

  const handleIncrement = useCallback((): void => {
    setCount((prev) => {
      const newCount = prev + 1;
      onCountUpdate(newCount);
      return newCount;
    });
  }, [onCountUpdate]);

  return <button onClick={handleIncrement}>Count: {count}</button>;
};

export default Counter;
