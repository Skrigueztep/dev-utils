import {ConsoleArgs} from "../utils/get-console-agrs";

interface Initializer {
  execute(args: ConsoleArgs): Promise<void> | void;
}

export interface State { }

export abstract class CLI<T extends State> implements Initializer {

  protected constructor(state?: T) {
  }

  execute(_: ConsoleArgs): Promise<void> | void {
    throw new Error('Not implemented method');
  }

}
