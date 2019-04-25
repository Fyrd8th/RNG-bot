const { prefix } = require('../config.json')

module.exports = {
  name: 'help',
  description: 'List all of my commands or info about a specific command.',
  aliases: ['commands'],
  usage: '[command name]',
  cooldown: 5,
  execute(message, args) {
    const { commands } = message.client
    const data = []

    if (!args.length) {
      data.push('Here is a list of all my commands:')
      data.push(commands.map(command => command.name).join(', '))
      data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`)
    }
    else {
      if (!commands.has(args[0])) {
        return message.reply('That is not a valid command, sorry.')
      }

      const command = commands.get(args[0])

      data.push(`**Name:** ${command.name}`)

      if (command.description) data.push(`**Description:** ${command.description}`)
      if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`)
      if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`)

      data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`)
    }

    message.author.send(data.join('\n'), { split: true })
      .then(() => {
        if (message.channel.type !== 'dm') {
          message.channel.send('I have sent you a DM with all my commands.')
        }
      })
      .catch(() => message.reply('It seems I cannot send help to you by DM.'))
  },
}