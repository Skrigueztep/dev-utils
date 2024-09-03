import {CLI} from "dev-kit";

export class DevFeedCLI extends CLI<any>{

  constructor() {
    super();
  }

  public execute(): Promise<void> | void {
    console.log('Enter to execute from DevFeedCLI class')
  }

}
