export default class Logger {
  public static warning(message: string, ...optionaParams: any[]) {
    // tslint:disable-next-line:no-console
    console.warn(message, ...optionaParams);
  }

  public static error(message: string, ...optionaParams: any[]) {
    // tslint:disable-next-line:no-console
    console.error(message, ...optionaParams);
  }
}
