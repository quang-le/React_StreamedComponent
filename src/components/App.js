import React from "react";
import useStream from "./useStream";
// if not using StreamedValue, rxjs must be imported
import StreamedValue from "./StreamedValue";
import Child from "./Child";

const App = () => {
  const myStreamedValue = new StreamedValue({ initialValue: "start" });
  const snapshot = useStream(myStreamedValue.stream());
  return <Child snapshot={snapshot} />;
};
export default App;
