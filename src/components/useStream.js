import { useState, useEffect } from "react";

const useStream = observer => {
  const [snapshot, setSnapshot] = useState();
  useEffect(() => {
    var stream = observer.subscribe({
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
