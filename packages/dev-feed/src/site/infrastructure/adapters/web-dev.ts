import {Site} from "../../application/site";
import {Page} from "playwright";
import {Data} from "../../domain/data";

export class WebDev extends Site {

  constructor() {
    super('https://web.dev/blog', 'div[class*="devsite-card-content-wrapper"]');
  }

  public async pageContent(page: Page): Promise<Data[]> {
    return page.$$eval(this.containerName, (articles) => {
      return articles.map((article) => {
        const title: HTMLAnchorElement | null = article.querySelector('div[class*="devsite-card-content"] > a');
        const subtitle: HTMLAnchorElement | null = article.querySelector('ul[class*="devsite-dynamic-content-display-tag-container"]');

        const authorName: HTMLParagraphElement | null = article.querySelector('p[class*="devsite-card-attribution-author"]');
        const date: HTMLTimeElement | null = article.querySelector('p[class="devsite-card-attribution-date"]');

        return {
          title: title?.textContent || '',
          type: subtitle?.textContent || '',
          author: authorName?.textContent || '',
          link: title?.href || '',
          date: date?.textContent || ''
        } as Data;
      });

    })
  }

}
