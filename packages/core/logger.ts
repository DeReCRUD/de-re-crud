/* eslint-disable no-console */

export default class Logger {
  public static debug(message: string, ...optionaParams: any[]) {
    if (process.env.ENABLE_LOGGING) {
      console.log(message, ...optionaParams);
    }
  }

  public static warning(message: string, ...optionaParams: any[]) {
    console.warn(message, ...optionaParams);
  }

  public static error(message: string, ...optionaParams: any[]) {
    console.error(message, ...optionaParams);
  }
}
