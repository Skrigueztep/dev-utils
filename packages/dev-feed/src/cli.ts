import {CLI} from "dev-kit";
import {Site} from "./site/application/site";
import {Feed} from "./site/infrastructure/feed";
import {NodeJS} from './site/infrastructure/adapters/nodejs';
import {Eslint} from "./site/infrastructure/adapters/eslint";
import {WebDev} from "./site/infrastructure/adapters/web-dev";
import {Vue} from "./site/infrastructure/adapters/vue";
import {React} from "./site/infrastructure/adapters/react";
import {Vite} from "./site/infrastructure/adapters/vite";
import {Typescript} from "./site/infrastructure/adapters/typescript";
import {Astro} from "./site/infrastructure/adapters/astro";
import {ReporterFile} from "./report/reporter-file";
import {JSONReporter} from "./report/json-reporter";
import {Data} from "./site/domain/data";
import {join, resolve} from "path";
import {cwd} from "process";

export class DevFeedCLI extends CLI<any> {

  constructor() {
    super();
  }

  public async execute(): Promise<void> {
    try {
      const sites: { name: string, site: Site }[] = [
        {name: 'NodeJS', site: new NodeJS()},
        {name: 'Eslint', site: new Eslint()},
        {name: 'WebDev', site: new WebDev()},
        {name: 'Vue', site: new Vue()},
        {name: 'React', site: new React()},
        {name: 'Vite', site: new Vite()},
        {name: 'Typescript', site: new Typescript()},
        {name: 'Astro', site: new Astro()}
      ];

      const feed: Feed = new Feed();
      const currentData: Map<string, Data[]> = await feed.scrap(sites, true);

      const reporterFile: ReporterFile = new ReporterFile({name: 'last-feed', output: resolve(join(cwd(), '/report'))});
      let newData: Map<string, Data[]> = new Map<string, Data[]>([]);

      if (reporterFile.exist('.json')) {
        const fileContent = reporterFile.readFile<object>('.json');
        const prevData: Map<string, Data[]> = new Map<string, Data[]>(Object.entries(fileContent));

        if (prevData.size > 0) {
          prevData.forEach((data: Data[], key: string) => {
            const currentContent: Data[] = currentData.get(key) || [];
            for (const currentItemContent of currentContent) {
              const item: Data | undefined = data.find((item: Data) => item.title === currentItemContent.title && item.date === currentItemContent.date);

              if (!item) {
                const prevNewData: Data[] = newData.get(key) || [];
                newData.set(key, [...prevNewData, currentItemContent]);
              }
            }
          });
        } else {
         newData = currentData;
        }
      } else {
        newData = currentData;
      }

      const jsonReporter: JSONReporter = new JSONReporter();
      const content: string = jsonReporter.generateFile(Object.fromEntries(newData.entries()));
      reporterFile.createReportFile(content, '.json');

      console.log(content);
    } catch (e) {
      console.log(e);
    }
  }

}
