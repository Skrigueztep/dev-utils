import {ConsoleArgs} from "../utils/get-console-agrs";

interface Initializer {
  execute(): Promise<void> | void;
}

export abstract class State {
  protected constructor(_?: ConsoleArgs) { }
}

export abstract class CLI<T extends State> implements Initializer {

  protected constructor(state?: T) {
  }

  execute(): Promise<void> | void {
    throw new Error('Not implemented method');
  }

}
