# DevKit

## CLI implementation

### Configuring State for data persistence
Use a state to data persistence and twice get/generate commands or flags vía terminal input

For a State you need to create a class for this state, like example below:

```ts
import {State, ConsoleArgs} from 'dev-kit';

export class MyCustomState extends State {

  constructor(args: ConsoleArgs) {
    super(args);
    
    // If you need yo create, evaluate or assign attribute values according prompt inputs you can
    // assign it in this step vía args['KeyOrFlag']
    
    // Add your own logic here!
  }

}
```

### Configuring CLI

For a CLI instance you need to create a class for this CLI, like example below:

```ts
import {CLI, State} from 'dev-kit';

export class MyCLI extends CLI<T = State> {
  
  private readonly _config: State;
  
  constructor(config: any) {
    super();
    this._config = config;
  }

  // Inside this method you can use your state attributes like keys of flags to create your CLI funcitonality
  public execute(): Promise<void> | void {
    // All you logic here
  }

}
```

### Using your CLI

For use your custom CLI you need follow the next steps:
- Get process input args and convert it an object
- If you use a custom state, you need pass these args object to your custom state class
- And you need to call to your own CLI class, and pass the state if needed
- Finally call to execute method

```ts
import { ConsoleArgs, getConsoleArgs } from 'dev-kit';

const args: ConsoleArgs = getConsoleArgs(process.argv);
const state: MyCustomState = new MyCustomState(args);
const cli: CLI<MyCustomState> = new MyCLI(state);
cli.execute();
```
