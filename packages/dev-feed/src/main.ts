#!/usr/bin/env node

import {DevFeedCLI} from "./cli";
import {CLI} from "dev-kit";

const cli: CLI<any> = new DevFeedCLI();
cli.execute();
