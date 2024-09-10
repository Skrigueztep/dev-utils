import { Page } from "playwright";
import {Site} from "../../application/site";
import {Data} from "../../domain/data";

export class Eslint extends Site {

  constructor() {
    super('https://eslint.org/blog/', 'article.card');
  }

  public pageContent(page: Page): Promise<Data[]> {
    return page.$$eval(this.containerName, (articles) => {
      return articles.map((article) => {
        const title: HTMLAnchorElement | null = article.querySelector('h3.card__title > a');
        const subtitle: HTMLSpanElement | null = article.querySelector('span[class*="blog-post__category"]');
        const authorName: HTMLParagraphElement | null = article.querySelector('div[class*="blog-post__author-name"]');
        const date: HTMLTimeElement | null = article.querySelector('time');

        return {
          title: String(title?.textContent || '').replaceAll('\n', '').trim(),
          type: String(subtitle?.textContent || '').replaceAll('\n', '').trim().split(':')[1],
          author: authorName?.textContent || '',
          link: title?.href || '',
          date: new Date(date?.textContent || '').toLocaleDateString()
        } as Data;
      });
    });
  }

}
