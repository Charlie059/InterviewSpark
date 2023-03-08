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

export function debug(message: any, obj?: any): void {
  if (logLevel <= LogLevel.DEBUG) {
    const functionName = getFunctionName()
    console.log(
      chalk.gray(`[${new Date().toISOString()}] [DEBUG] [${functionName}]`) + ' ' + JSON.stringify(message, null, 2)
    )
    if (obj) {
      console.log(obj)
    }
  }
}

export function info(message: any, obj?: any): void {
  if (logLevel <= LogLevel.INFO) {
    const functionName = getFunctionName()
    console.log(
      chalk.cyan(`[${new Date().toISOString()}] [INFO] [${functionName}]`) + ' ' + JSON.stringify(message, null, 2)
    )
    if (obj) {
      console.log(obj)
    }
  }
}

export function warn(message: any, obj?: any): void {
  if (logLevel <= LogLevel.WARN) {
    const functionName = getFunctionName()
    console.log(
      chalk.yellow(`[${new Date().toISOString()}] [WARN] [${functionName}]`) + ' ' + JSON.stringify(message, null, 2)
    )
    if (obj) {
      console.log(obj)
    }
  }
}

export function error(message: any, obj?: any): void {
  if (logLevel <= LogLevel.ERROR) {
    const functionName = getFunctionName()
    console.log(
      chalk.red(`[${new Date().toISOString()}] [ERROR] [${functionName}]`) + ' ' + JSON.stringify(message, null, 2)
    )
    if (obj) {
      console.log(obj)
    }
  }
}

function getFunctionName(): string {
  const error = new Error()
  const stack = error.stack?.split('\n')
  if (stack) {
    const functionName = stack[3].trim().split(' ')[1]

    return functionName.substring(0, functionName.length - 1)
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
