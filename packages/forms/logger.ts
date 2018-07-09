export default class Logger {
  static warning(message: string, ...optionaParams: any[]) {
    console.warn(message, ...optionaParams);
  }

  static error(message: string, ...optionaParams: any[]) {
    console.error(message, ...optionaParams);
  }
}