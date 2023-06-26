import chalk from 'chalk'

enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3
}

let logLevel = LogLevel.DEBUG

export function setLogLevel(level: LogLevel): void {
  logLevel = level
}

function log(level: LogLevel, levelStr: string, color: (s: string) => string, ...messages: any[]): void {
  if (logLevel <= level) {
    const functionName = getFunctionName()
    console.log(
      color(`[${new Date().toISOString()}] [${levelStr}] [${functionName}]`),
      ...messages.map(m => (typeof m === 'string' ? m : JSON.stringify(m, null, 2)))
    )
  }
}

export function debug(...messages: any[]): void {
  log(LogLevel.DEBUG, 'DEBUG', chalk.gray, ...messages)
}

export function info(...messages: any[]): void {
  log(LogLevel.INFO, 'INFO', chalk.cyan, ...messages)
}

export function warn(...messages: any[]): void {
  log(LogLevel.WARN, 'WARN', chalk.yellow, ...messages)
}

export function error(...messages: any[]): void {
  log(LogLevel.ERROR, 'ERROR', chalk.red, ...messages)
}

function getFunctionName(): string {
  const error = new Error()
  const stack = error.stack?.split('\n')
  if (stack) {
    const functionName = stack[3].trim().split(' ')[1]

    return functionName ? functionName : ''
  } else {
    return ''
  }
}

export default {
  setLogLevel,
  debug,
  info,
  warn,
  error
}
