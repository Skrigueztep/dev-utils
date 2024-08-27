import {mkdirSync, readFileSync} from "fs";
import {render} from "ejs";
import {existsSync, writeFileSync} from "node:fs";

export interface GeneratorParams {
  templatesPath: string;
  templatesListToGenerate: { templateName: string, extension: string }[];
}

export abstract class Generator implements GeneratorParams {

  private readonly _path: string;
  public readonly templatesPath: string;
  public readonly templatesListToGenerate: { templateName: string, extension: string }[];

  protected constructor(path: string, { templatesPath, templatesListToGenerate }: GeneratorParams) {
    this._path = path;
    this.templatesPath = templatesPath;
    this.templatesListToGenerate = templatesListToGenerate;
  }

  public generate<T extends Object>(data: T): void {
    for (const templateItem of this.templatesListToGenerate) {
      const templateContent: string = readFileSync(this.templatesPath.concat(`/${templateItem.templateName}.ejs`), { encoding: "utf-8", flag: 'r' });
      const docContent: string = render(templateContent, data, {});
      if (!existsSync(this._path)) {
        mkdirSync(this._path, { recursive: true });
      }
      writeFileSync(this._path.concat(`/${templateItem.templateName}${templateItem.extension}`), docContent, { encoding: "utf-8" });
    }
  }

}
