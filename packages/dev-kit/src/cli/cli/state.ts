import {State as IState} from "../core/base/cli";
import {ConsoleArgs} from "../core/utils/get-console-agrs";
import {resolve} from "path";
import {cwd} from "process";
import {GeneratorsEnum} from "./generators-enum";

interface StateDefinition {
  generate: string;
  path: string;
}

export class State extends IState implements StateDefinition {

  public generate: GeneratorsEnum;
  public path: string;

  constructor(args?: ConsoleArgs) {
    super(args);
    this.generate = (args && args['generate']) ? args['generate'] as GeneratorsEnum : GeneratorsEnum.VUE;
    this.path = (args && args['path']) ? resolve(cwd(), args['path'] as string) : resolve(cwd(), '');
  }

}
