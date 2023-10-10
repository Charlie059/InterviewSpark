import chalk from 'chalk'

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3
}

let logLevel = LogLevel.DEBUG

export function setLogLevel(level: LogLevel): void {
  if (process.env.NODE_ENV === 'production') {
    logLevel = LogLevel.ERROR
  } else {
    logLevel = level
  }
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
  const originalPrepareStackTrace = Error.prepareStackTrace
  Error.prepareStackTrace = function (_, stack) {
    return stack
  }

  const error = new Error()
  if (typeof Error.captureStackTrace !== 'function') {
    return ''
  }
  Error.captureStackTrace(error, getFunctionName)
  const stack: NodeJS.CallSite[] = error.stack as any

  const functionName = stack[2].getFunctionName()

  Error.prepareStackTrace = originalPrepareStackTrace

  return functionName ? functionName : ''
}

export default {
  setLogLevel,
  debug,
  info,
  warn,
  error
}
