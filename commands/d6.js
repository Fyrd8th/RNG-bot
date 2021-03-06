const roll = require('./roll')

module.exports = {
  name: 'D6',
  description: 'Roll D6.',
  aliases: ['d6', 'six', 'dsix'],
  usage: '[number of dice]',
  execute(message, args) {
    const concatargs = ['6'].concat(args)
    roll.execute(message, concatargs)
  },
}