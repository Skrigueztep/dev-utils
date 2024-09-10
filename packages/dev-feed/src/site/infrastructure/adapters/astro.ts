import {Site} from "../../application/site";
import {Page} from "playwright";
import {Data} from "../../domain/data";

export class Astro extends Site {

  constructor() {
    super('https://astro.build/blog', 'article');
  }

  public pageContent(page: Page): Promise<Data[]> {
    return page.$$eval(this.containerName, (articles) => {
      return articles.map((article) => {
        const title: HTMLAnchorElement | null = article.querySelector('h3 > a');
        const date: HTMLTimeElement | null = article.querySelector('time');

        return {
          title: String(title?.textContent || '').replaceAll('\n', '').trim(),
          type: '',
          author: '',
          link: title?.href || '',
          date: new Date(date?.textContent || '').toLocaleDateString()
        } as Data;
      });
    });
  }

}
