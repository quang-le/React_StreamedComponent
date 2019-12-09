import React, { useContext, useEffect } from "react";
import useStream from "./useStream";
import BlocContext from "../contexts/BlocContext";

const Child = ({ snapshot }) => {
  const context = useContext(BlocContext);
  const localStream = useStream(context.testValue.stream());

  // Modifying stream values inside the BLoC from here
  // creates an infinite loop.
  //context.testValue.inStream("from Child");
  //context.testValue.value = "child value";
  // use useEffect, like so (fill in the array as needed):
  useEffect(() => {
    context.testValue.inStream("from Child");
    context.testValue.value = "child value";
  }, []);

  return (
    <div>
      <div>From useStream hook : {snapshot}</div>
      <div>From Bloc and context: {localStream}</div>
    </div>
  );
};
export default Child;
