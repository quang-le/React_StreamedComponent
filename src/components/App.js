import React from "react";
import useStream from "./useStream";
import StreamedValue from "./StreamedValue";

const App = () => {
  const myStreamedValue = new StreamedValue({ initialValue: "start" });
  const snapshot = useStream(myStreamedValue.stream());
  return <div>{snapshot}</div>;
};
export default App;
