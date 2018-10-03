export default class Logger {
  public static debug(message: string, ...optionaParams: any[]) {
    if (process.env.ENABLE_LOGGING) {
      // tslint:disable-next-line:no-console
      console.log(message, ...optionaParams);
    }
  }

  public static warning(message: string, ...optionaParams: any[]) {
    // tslint:disable-next-line:no-console
    console.warn(message, ...optionaParams);
  }

  public static error(message: string, ...optionaParams: any[]) {
    // tslint:disable-next-line:no-console
    console.error(message, ...optionaParams);
  }
}
