import React, { useContext, useRef, useEffect } from "react";
import NoDepBloc from "../contexts/no_dep/NoDepBloc";
import NoDepContext from "../contexts/no_dep/NoDepContext";

const NoDepChild = () => {
  const context = useContext(NoDepContext);
  const methodController = useRef(0);

  // hard-coded value chaneg is ok:
  context.setStream2(10);
  // changing values dynamically should be done in
  // useEffect to avoid infinite loops

  // For example:
  //context.blocMethod1(context.stream1, context.setStream1);
  // because setState generates re-render and the function is called on render
  // TODO: find a way to manipulate stream values in Component other than useRef?
  // without creating infinite loop
  // Here is a workaround with useRef" (in this particuar case,
  // leaving the array emprt works just as well).
  useEffect(() => {
    console.log("useEffect");
    context.blocMethod1(context.stream1, context.setStream1);
  }, [methodController.current]);

  return (
    <NoDepBloc>
      <div>{context.stream1}</div>
      <div>{context.stream2}</div>
      <div>{context.stream3}</div>
    </NoDepBloc>
  );
};

export default NoDepChild;
