const { client } = require('./utils/client')

const { TOKEN } = require('./token.json');

const { PREFIX } = require('./config.json')

client.on('ready', () => {
    console.log(`Logged into: ${client.user.tag}`)
})

client.on('messageCreate', msg => {
    if (msg.content === PREFIX + "chat") {
        msg.reply("https://tenor.com/view/sleep-cat-two-cat-cat-cat-love-gif-23651667")
    }
})


client.login(TOKEN)
