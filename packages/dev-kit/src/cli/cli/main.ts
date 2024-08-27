import {CLI} from "../core/base/cli";
import {Generator} from "../core/generate/generator";
import {VueGenerator} from "../vue-generator/vue-generator";
import {sep} from "path";
import {GeneratorsEnum} from "./generators-enum";
import {State} from "./state";

export class Main extends CLI<State> {

  private readonly _config: State;

  constructor(config: any) {
    super();
    this._config = config;
  }

  public execute(): Promise<void> | void {
    if (this._config.generate) {
      const generators: Record<GeneratorsEnum, Generator> = {
        [GeneratorsEnum.VUE]: new VueGenerator(this._config.path)
      }

      try {
        const generator: Generator = generators[this._config.generate];
        const pathRoutes: string[] = this._config.path.split(sep);
        const componentName: string = pathRoutes[pathRoutes.length - 1];
        const data = { name: componentName };
        generator.generate(data);
      } catch (e) {
        console.log('Error on generate process: ', e);
      }
    }
  }

}
