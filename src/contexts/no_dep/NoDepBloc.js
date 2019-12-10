import React, { useState, useEffect, useRef } from "react";
import NoDepContext from "./NoDepContext";

// Define methods here, with the [state,setState] as param
const method1 = (value, setValue) => {
  const newValue = value + 1;
  setValue(newValue);
};

// BONUS: methods that should remain private are simply not passed
// through the value prop
const method2 = (value, setOtherValue) => {
  if (value > 10) {
    setOtherValue("Yay big number");
  } else {
    setOtherValue("tiny number");
  }
};

const MyBloc = ({ children }) => {
  // first streamed value
  // to update the value from a child component, just call setStream1
  const [stream1, setStream1] = useState(0);

  // stream manipulation from inside the BLoC and other side effects
  // should be done with useEffect
  // Example: if 2 streamed values become true, trigger something in a 3rd stream
  const [stream2, setStream2] = useState(1);
  useEffect(() => {
    method2(stream2, setStream3);
  }, [stream2]);

  // use useRef to persist data between renders, here a render count
  const renderCount = useRef(0);
  const [stream3, setStream3] = useState("awaiting value");

  // renderCount updated at each render
  useEffect(() => {
    renderCount.current += 1;
    console.log("NoDep render count: ", renderCount.current);
  });

  // define methods outside the function, then assign them
  const blocMethod1 = method1;

  // is the children arg really necessary?
  // use ES6 implicit pattern matching to populate the BlocProvider
  return (
    <NoDepContext.Provider
      value={{
        stream1,
        setStream1,
        stream2,
        setStream2,
        stream3,
        setStream3,
        blocMethod1
      }}
    >
      {children}
    </NoDepContext.Provider>
  );
};

export default MyBloc;
