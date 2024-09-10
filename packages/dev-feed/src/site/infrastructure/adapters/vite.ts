import {Site} from "../../application/site";
import {Page} from "playwright";
import {Data} from "../../domain/data";

export class Vite extends Site {

  constructor() {
    super('https://vitejs.dev/blog.html', 'article');
  }

  public pageContent(page: Page): Promise<Data[]> {
    return page.$$eval(this.containerName, (articles) => {
      return articles.map((article) => {
        const title: HTMLAnchorElement | null = article.querySelector('h2[class*="title"] > a');
        const date: HTMLTimeElement | null = article.querySelector('time');

        return {
          title: title?.textContent || '',
          type: '',
          author: '',
          link: title?.href || '',
          date: new Date(date?.textContent || '').toLocaleDateString()
        } as Data;
      });

    })
  }

}
