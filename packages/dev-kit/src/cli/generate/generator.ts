import {mkdirSync, readFileSync} from "fs";
import {render} from "ejs";
import {existsSync, writeFileSync} from "node:fs";

export class Generator {

  private readonly _path: string;

  constructor(path: string) {
    this._path = path;
  }

  public generate<T extends Object>(templatesPath: string, templatesListToGenerate: { templateName: string, extension: string }[], data: T): void {
    for (const templateItem of templatesListToGenerate) {
      const templateContent: string = readFileSync(templatesPath.concat(`/${templateItem.templateName}.ejs`), { encoding: "utf-8", flag: 'r' });
      const docContent: string = render(templateContent, data, {});
      if (!existsSync(this._path)) {
        mkdirSync(this._path, { recursive: true });
      }
      writeFileSync(this._path.concat(`/${templateItem.templateName}${templateItem.extension}`), docContent, { encoding: "utf-8" });
    }
  }

}
