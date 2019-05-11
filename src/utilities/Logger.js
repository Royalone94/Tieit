// @flow

export class Logger {
  tag: string;

  constructor(tag: string) {
    this.tag = tag;
  }
  __log(level: string, ...data: any): void {
    const strToLog = `${level.toUpperCase()} - ${this.tag}: `;
    console[level](strToLog, ...data);
  }
  log(...data: any): void {
    this.__log('log', ...data);
  }
  info(...data: any): void {
    this.__log('info', ...data);
  }
  error(...data: any): void {
    this.__log('error', ...data);
  }
  debug(...data: any): void {
    this.__log('debug', ...data);
  }
  warn(...data: any): void {
    this.__log('warn', ...data);
  }
  table(...data: any): void {
    this.__log('table', ...data);
  }
}
