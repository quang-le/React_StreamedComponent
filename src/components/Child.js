import React, { useContext } from "react";
import useStream from "./useStream";
import BlocContext from "../contexts/BlocContext";

const Child = ({ snapshot }) => {
  const context = useContext(BlocContext);
  const localStream = useStream(context.testValue.stream());
  return (
    <div>
      <div>From useStream hook : {snapshot}</div>
      <div>From Bloc and context: {localStream}</div>
    </div>
  );
};
export default Child;
