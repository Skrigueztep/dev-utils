import { Page } from "playwright";
import {Site} from "../application/site";
import {Data} from "../domain/data";

export class NodeJS extends Site {

  constructor() {
    super('https://nodejs.org/en/blog', 'article[class*="BlogPostCard_container"]');
  }

  public async pageContent(page: Page): Promise<Data[]> {
    return page.$$eval(this.containerName, (articles) => {
      return articles.map((article) => {
        const title: HTMLAnchorElement | null = article.querySelector('a[class*="BlogPostCard_title"]');
        const subtitle: HTMLAnchorElement | null = article.querySelector('a[class*="BlogPostCard_subtitle"]');

        const author: HTMLDivElement | null = article.querySelector('div[class*="BlogPostCard_author"]');
        const authorName: HTMLParagraphElement | null = author?.querySelector('p') || null;
        const date: HTMLTimeElement | null = author?.querySelector('time') || null;

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
