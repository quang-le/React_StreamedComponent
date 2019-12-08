import { BehaviorSubject } from "rxjs";

// When initializzing, pass an object with initialValue, and onChange fields(both optional)
export default class StreamedValue {
  // TODO find best way to initialize
  constructor(props) {
    //making the stream private by initializing it
    //in the constructor
    var _stream = new BehaviorSubject("test");
    this.timesUpdated = 0;
    this.stream = () => _stream;
    //this.stream = this.stream.bind(this);
    var _onChange = props.onChange;
    // getter and setter syntax adapter for use in constructor
    this.getOnChange = () => _onChange;
    this.setOnChange = func => (_onChange = func);

    var _debugMode = false;
    this.setDebugMode = bool => (_debugMode = bool);
    this.getDebugMode = () => _debugMode;

    //TODO check erro management in rxjs
    this.observer = _stream.subscribe({
      next: next => {
        if (_onChange) {
          _onChange(next);
        }
      },
      error: error => console.log(error),
      complete: () => console.log("completed")
    });
    if (props.initialValue) {
      _stream.next(props.initialValue);
    }
  }
  // is this necessary?
  stream;
  getOnChange;
  setOnChange;
  getDebugMode;
  setDebugMode;
  observer;

  get outStream() {
    // In this form, the callbacks still need to be defined
    // this will probably be updated when working on
    // StreamedComponent or managed directly in the Componenet itself
    return this.stream().subscribe;
  }

  inStream(value) {
    this.stream().next(value);
    this.timesUpdated++;
  }

  get value() {
    return this.stream().value;
  }

  set value(value) {
    this.stream().next(value);
    this.timesUpdated++;
    return;
  }

  refresh() {
    this.inStream(this.value);
    this.timesUpdated++;
    return;
  }

  set onChange(func) {
    return this.setOnChange(func);
  }

  debugMode(bool) {
    this.setOnChange(bool);
    return;
  }
  dispose() {
    if (this.getDebugMode) {
      console.log("--------------Closing Stream--------------");
      console.log("value: ", this.value);
      console.log(`updated ${this.timesUpdated} times`);
    }
    this.stream().close();
    return;
  }
}
// TODO see if there's a need to implement _lastValue from frideos
