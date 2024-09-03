import { Page } from "playwright";
import {Data} from "./data";

export interface SiteDefinition {
  url: string;
  containerName: string;

  pageContent(page: Page): Promise<Data[]>
}
