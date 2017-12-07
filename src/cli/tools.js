import chalk from 'chalk'
import leftPad from 'left-pad'

const info = (type, message) => {
  console.log(`${chalk.green.bold(leftPad(type, 12))}  ${message}`)
}

const error = (message) => {
  console.error(chalk.red(message))
}

const success = (message) => {
  console.error(chalk.green(message))
}

export default {
  info,
  error,
  success,
}
