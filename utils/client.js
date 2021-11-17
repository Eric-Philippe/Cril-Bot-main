const Discord = require('discord.js');

const { ClientOptions } = require("./clientOption")

module.exports.client = new Discord.Client(ClientOptions);