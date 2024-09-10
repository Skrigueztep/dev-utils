import {Site} from "../../application/site";
import {Page} from "playwright";
import {Data} from "../../domain/data";

export class Vue extends Site {

  constructor() {
    super('https://blog.vuejs.org', 'article');
  }

  public pageContent(page: Page): Promise<Data[]> {
    return page.$$eval(this.containerName, (articles) => {
      return articles.map((article) => {
        const title: HTMLAnchorElement | null = article.querySelector('h2 > a');
        const date: HTMLTimeElement | null = article.querySelector('time');

        return {
          title: title?.textContent || '',
          type: '',
          author: '',
          link: title?.href || '',
          date: new Date(date?.textContent || '').toLocaleDateString()
        } as Data;
      });
    });
  }

}
