//this is a pseudo abstract class, do not instantiate

export default class Bloc {
  constructor() {
    if (new.target === Bloc)
      throw new TypeError("Can not instantiate abstract classes directly");
  }
  overrideCheck(target) {
    if (typeof target.dispose !== "function")
      throw new TypeError("Must override dipose()");
  }
}
