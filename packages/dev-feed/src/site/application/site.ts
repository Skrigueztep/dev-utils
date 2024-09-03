import {SiteDefinition} from "../domain/site-definition";
import {Data} from "../domain/data";
import { Page } from "playwright";

export abstract class Site implements SiteDefinition {
  public url: string;
  public containerName: string;

  protected constructor(url: string, containerName: string) {
    this.url = url;
    this.containerName = containerName;
  }

  public pageContent(_: Page): Promise<Data[]> {
    throw new Error("Method not implemented.");
  }
}
