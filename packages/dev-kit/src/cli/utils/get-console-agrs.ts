export type ConsoleArgs = { [index: string]: string | boolean; };

export function getConsoleArgs(consoleArgs: string[]): ConsoleArgs {
  const args: { [index: string]: boolean | string } = {};
  consoleArgs.slice(2, consoleArgs.length).forEach((arg: string): void => {
    // Long Args
    if (arg.slice(0, 2) === '--') {
      const longArg: string[] = arg.split('=');
      const [key, ...value] = longArg;
      const longArgFlag: string = key.slice(2, key.length);
      args[longArgFlag] = longArg.length > 1 ? value.join('=') : true;
    }
    // Flags
    else if (arg[0] === '-') {
      const flags: string[] = arg.slice(1, arg.length).split('');
      flags.forEach((flag: string): void => {
        args[flag] = true;
      });
    }
  });
  return args;
}
