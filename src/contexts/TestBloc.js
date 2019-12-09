import Bloc from "./Bloc";
import StreamedValue from "../components/StreamedValue";

export default class TestBloc extends Bloc {
  constructor() {
    super();
    super.overrideCheck(this);
  }
  dispose = () => {
    console.log("dispose()");
  };
  testValue = new StreamedValue({ initialValue: "prout" });
}
