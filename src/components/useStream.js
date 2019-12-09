import { useState, useEffect } from "react";

// observer must be an Rx observable
const useStream = observable => {
  const [snapshot, setSnapshot] = useState();
  useEffect(() => {
    var stream = observable.subscribe({
      next: next => setSnapshot(next),
      error: error => console.log("stream error: ", error),
      complete: () => console.log("subscription complete")
    });
    return () => {
      stream.unsubscribe();
    };
  });
  return snapshot;
};

export default useStream;
