import {Site} from "../../application/site";
import {Page} from "playwright";
import {Data} from "../../domain/data";

export class React extends Site {

  constructor() {
    super('https://es.react.dev/blog', 'div[class*="sm:-mx-5 flex flex-col gap-5 mt-12"] > a');
  }

  public pageContent(page: Page): Promise<Data[]> {
    return page.$$eval(this.containerName, (articles) => {

      console.log(articles)

      return articles.map((article) => {
        const link: HTMLLinkElement = article as HTMLLinkElement;
        const title: HTMLHeadElement | null = article.querySelector('h2');
        const date: HTMLDivElement | null = article.querySelector('div > div[class*="flex flex-row justify-start gap-2 items-center text-base text-tertiary dark:text-tertiary-dark"]');

        return {
          title: title?.textContent || '',
          type: '',
          author: '',
          link: link?.href || '',
          date: new Date(date?.textContent || '').toLocaleDateString()
        } as Data;
      });
    })
  }

}
