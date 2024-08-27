import {ConsoleArgs} from "../utils/get-console-agrs";

interface Initializer {
  execute(): Promise<void> | void;
}

export abstract class State {

  public version: boolean;

  protected constructor(args?: ConsoleArgs) {
    this.version = (args && args['version']) ? args['version'] as boolean : false;
  }
}

export abstract class CLI<T extends State> implements Initializer {

  protected constructor(state?: T) {
  }

  execute(): Promise<void> | void {
    throw new Error('Not implemented method');
  }

}
