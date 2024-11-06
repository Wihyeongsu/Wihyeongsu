import { useState } from "react";
import "./App.css";
import Flow from "./components/test1";
import Counter from "./components/test2";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Counter initialCount={count} onCountUpdate={setCount} />
    </div>
  );
}

export default App;
