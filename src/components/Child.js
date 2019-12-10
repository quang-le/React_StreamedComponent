import React, { useContext, useEffect, useRef } from "react";
import useStream from "./useStream";
import BlocContext from "../contexts/BlocContext";

const Child = ({ snapshot }) => {
  const context = useContext(BlocContext);
  const renderCount = useRef(0);
  const localStream = useStream(context.testValue.stream());

  // Modifying stream values inside the BLoC from here
  // creates an infinite loop.
  //context.testValue.inStream("from Child");
  //context.testValue.value = "child value";
  // use useEffect, like so (fill in the array as needed):
  useEffect(() => {
    context.testValue.inStream("from Child");
    context.testValue.value = "child value";
  }, [context]);

  useEffect(() => {
    renderCount.current += 1;
    console.log("Classic Bloc render count: ", renderCount.current);
  });

  return (
    <div>
      <div>From useStream hook : {snapshot}</div>
      <div>From Bloc and context: {localStream}</div>
    </div>
  );
};
export default Child;
