## React StreamedValue and StreamedComponent

# Introduction

This a R&D project around streams and BLoC pattern in React.

Initially, the objective was to replicate the functionalities of `StreamedValue` and `StreamedWidget` from [frideos'](https://github.com/frideosapps) [frideos_core](https://pub.dev/packages/frideos_core) Flutter package in React.

These features simplify the use of streams with the [Rx library](https://github.com/ReactiveX/rxjs) by simplifying the syntax, leading to lighter, more readble code.

As I went on with the implementation, it struck me that React hooks could be used in a stream-like fashion. If so, it might be possible to use them to implement the BLoC pattern without the dependency to Rx.

So the new question is: can we implement the BLoC pattern using just React hooks (sppoiler: yes, we can) and if so, is it possible to develop custom hooks/components that provide the same quality of life (more compact, legible code).

This is both a learning and quality of life project: as I'm using frideos' library to manage streams in Flutter: having similar feature available in React would allow me to easily use streams and the BloC pattern as I start working with React. Creating this library or equivalent with hooks would also allow me to explore React through the lens of my Flutter experience and is a good shot at comparing the 2 frameworks.

# Install and start test app

- npx create-react-app [your-app]
- yarn start

# Features

1. **StreamedValue**

Syntactic sugar for BehaviorSubject.
Can be initialized with a value and an onChange function by passing it an object:
`streamedValue= new StreamedValue({initialValue:"value", onChange:value=>{doSomething(value)}});`

There's a getter and a setter for the value:

`console.log(streamedValue.value);//output:value streamedValue.value="new value"; console.log(streamedValue.value);//output:new value`

the value can also be modified by using the inStream method:

`streamedValue.inStream("third value) console.log(streamedValue.value);//output:third value`

you can set uo an observer with the outStream method:

`streamedValue.outStream(callback);`

is equivalent to

`behaviorSubject.stream.subscribe({ next:next=>callback(next), error:error=>console.log(error), complete:()=>console.log("completed") })`

I'll probably add the possibility to define error and complete callbacks as well.

There is a `dispose()`method to close the stream.

2. **useStream hook**

A very simple hook that returns the latest value of a BehaviorSubject.
Since the goal was to easily use the value emitted by s stream in a component, the hook approach proved simpler and shorter.

Just import it and use it's value: `const snapshot = useStream(myStreamedValue.stream());`

3. **NoDepBLoC**

A POC of BLoC implementation using hooks. `NoDepBLoC`returns a `<Context.Provider>` that has all the values and methods of the BLoC in the `values` prop.

So far, it's possible to :

- use and update "streamed" values
- invoke methods
- do simple value manipulations from within the BLoC

Formulated this way, it's all pretty standard stuff, but the key takeaway is that by combining context, useEffect, and useRef, it seems possible to create a BLoC object that performs logic and streams values directly to the relevant component.

# TODO

[] write tests

[] create StreamedList

[] update useStream to include error and complete params

[] update useStream to be compatible with all Rx Subjects

[] add error config to useStream

# Contribute

Feel free to file and issue, submit a PR or otherwise contact me to improve this project!
