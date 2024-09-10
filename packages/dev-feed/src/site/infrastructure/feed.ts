import {Data} from "../domain/data";
import {Browser, BrowserContext, chromium, Page} from "playwright";
import {Site} from "../application/site";

export class Feed {

  constructor() {
  }

  public scrap(sites: { name: string, site: Site }[], headless: boolean = true): Promise<Map<string, Data[]>> {
    return new Promise(async (resolve, reject) => {
      try {
        const browser: Browser = await chromium.launch({ headless });
        const context: BrowserContext = await browser.newContext();
        const page: Page = await context.newPage();

        const data: Map<string, Data[]> = new Map<string, Data[]>([]);
        for (const { name, site } of sites) {
          await page.goto(site.url, { waitUntil: 'domcontentloaded' });
          await page.waitForSelector(site.containerName);

          const content: Data[] = await site.pageContent(page);
          data.set(name, content);
        }
        await browser.close();

        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  }

}
