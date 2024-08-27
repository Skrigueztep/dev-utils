#!/usr/bin/env node

import {ConsoleArgs, getConsoleArgs} from "./cli/core/utils/get-console-agrs";
import {CLI} from "./cli/core/base/cli";
import {State} from "./cli/cli/state";
import {Main} from "./cli/cli/main";

const args: ConsoleArgs = getConsoleArgs(process.argv);
const state: State = new State(args);
const cli: CLI<State> = new Main(state);
cli.execute();
