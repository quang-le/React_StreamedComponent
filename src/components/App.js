import React from "react";
import StreamedValue from "./StreamedValue";

const App = () => {
  const mySubject = new StreamedValue({
    initialValue: "Hello World",
    onChange: value => console.log(value)
  });

  //console.log(mySubject);
  mySubject.value = "value";

  //console.log(mySubject);
  try {
    mySubject.inStream("inStream");
  } catch (e) {
    console.log(e);
  }

  console.log(mySubject.outStream);

  return <div>{mySubject.value} </div>;
};
export default App;
