import {Site} from "../../application/site";
import {Page} from "playwright";
import {Data} from "../../domain/data";

export class Typescript extends Site {

  constructor() {
    super('https://devblogs.microsoft.com/typescript/', 'div[class*="masonry-card"]');
  }

  public pageContent(page: Page): Promise<Data[]> {
    return page.$$eval(this.containerName, (articles) => {
      return articles.map((article) => {
        const title: HTMLAnchorElement | null = article.querySelector('h3 > a');
        const authorName: HTMLParagraphElement | null = article.querySelector('div[class*="d-flex gap-8 pb-16 flex-column"] > div > span');
        const date: HTMLTimeElement | null = article.querySelector('div[class*="d-flex gap-8 pb-16 flex-column"] > div:last-child');

        return {
          title: String(title?.textContent || '').replaceAll('\n', '').trim(),
          type: '',
          author: authorName?.textContent || '',
          link: title?.href || '',
          date: new Date(date?.textContent || '').toLocaleDateString()
        } as Data;
      });
    });
  }

}
