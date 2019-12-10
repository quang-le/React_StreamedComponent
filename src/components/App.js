import React from "react";
import useStream from "./useStream";
// if not using StreamedValue, rxjs must be imported
import StreamedValue from "./StreamedValue";
import Child from "./Child";
import BlocContext from "../contexts/BlocContext";
import TestBloc from "../contexts/TestBloc";

import NoDepChild from "./NoDepChild";
import NoDepBloc from "../contexts/no_dep/NoDepBloc";

const App = () => {
  const myStreamedValue = new StreamedValue({ initialValue: "start" });
  const snapshot = useStream(myStreamedValue.stream());

  // without Provider, the default value is used
  // but I don't know if many listeners would listen to the same context
  return (
    <div>
      <BlocContext.Provider value={new TestBloc()}>
        <Child snapshot={snapshot} />
      </BlocContext.Provider>
      <NoDepBloc>
        <NoDepChild />
      </NoDepBloc>
    </div>
  );
};
export default App;
