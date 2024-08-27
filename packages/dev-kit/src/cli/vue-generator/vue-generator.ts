import {Generator, GeneratorParams} from "../core/generate/generator";
import {join} from "path";

export class VueGenerator extends Generator implements GeneratorParams {

  constructor(path: string) {
    super(path, {
      templatesPath: join(__dirname, '../assets/templates/vue'),
      templatesListToGenerate: [
        { templateName: 'component', extension: '.vue' },
        { templateName: 'component.test', extension: '.ts' }
      ]
    });
  }

}
