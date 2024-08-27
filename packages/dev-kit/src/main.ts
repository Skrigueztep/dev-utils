#!/usr/bin/env node

import {ConsoleArgs, getConsoleArgs} from "./cli/core/utils/get-console-agrs";
import {CLI} from "./cli/core/base/cli";
import {State} from "./cli/cli/state";
import {Main} from "./cli/cli/main";

const args: ConsoleArgs = getConsoleArgs(process.argv);

if (Object.keys(args).length === 0) {

  console.log(`
  Available commands
  
  --generator   Enable generator files
    --path        Output path for files with filename included  - Required for generator
  --version     Prints current module version
  `);

  process.exit(0);
}

const state: State = new State(args);
const cli: CLI<State> = new Main(state);
cli.execute();
