const { client } = require("./utils/client"); //Client object
const { con } = require("./utils/mysql"); // Database Connexion

const { TOKEN } = require("./token.json"); // Private token
const { PREFIX } = require("./config.json"); // Prefix

// ############ Self Independant ##############
const Reminder = require("./commands/remindMe"); // RemindMe SelfIncrement
const { statusEdit } = require("./utils/status");

// ############ All Messages ##################
const { cmdGrabber } = require("./commands/commandsGrabber"); // Manager / Launcher for the commands
const chatBot = require("./helpSystem/chatBot"); // Chat Bot Help Support

// ############ Member Add Update #############
const Entry = require("./entry/entry"); // Manager for the entry system

// ############ Reaction Update ###############
const { pollRequest } = require("./commands/poll"); // Poll Update
const { reactionRole } = require("./pluginEmbed"); // ReactionRole Message

/** Wake up on ready state */
client.on("ready", async () => {
  console.log(`Logged into: ${client.user.tag}`);

  statusEdit(); // Status auto update

  con.connect(function (err) {
    if (err) console.log(err);
    console.log("Connected to database as ID : " + con.threadId);
    Reminder.remindCheck();
  });
});

/** Wake up on message sent */
client.on("messageCreate", async (msg) => {
  if (msg.author.bot) return;
  if (msg.channel.type === "DM") return;
  if (msg.author.id === client.user.id) return;
  if (msg.content.startsWith(PREFIX)) {
    cmdGrabber(msg);
  } else {
    new chatBot(msg);
  }
});

/** Wake up on reaction added */
client.on("messageReactionAdd", async (reaction, user) => {
  if (user.bot) return;
  let msg = await reaction.message.channel.messages.fetch(reaction.message.id);
  if (!msg.author.bot) return;
  await reactionRole(reaction, user);
  await pollRequest(reaction, user, true);
});

/** Wake up on reaction removed */
client.on("messageReactionRemove", async (reaction, user) => {
  if (user.bot) return;
  let msg = await reaction.message.channel.messages.fetch(reaction.message.id);
  if (!msg.author.bot) return;
  await pollRequest(reaction, user, false);
});

/** Wake up on new member income */
client.on("guildMemberAdd", (member) => {
  if (member.user.bot) return;
  if (member.user.id === client.user.id) return;
  new Entry(member);
});

client.on("messageCreate", (msg) => {
  console.log(msg.channel.type);
  if (msg.channel.type === "DM") {
    if (msg.author.id === "649323786612637727") {
      if (msg.content === "!launch") {
        msg.reply(
          "Vous devez trouver un mot. Entrez votre réponse avec !enter MOT. Si besoin, demandez l'indice numéro 1 en faisant !clue1 et, si vous êtes bloquée, un second avec !clue2 !"
        );
      } else if (msg.content === "!clue1") {
        msg.reply("It's hidden in his pants.");
      } else if (msg.content === "!clue2") {
        msg.reply("The Adder");
      } else if (msg.content.startsWith("!enter")) {
        let args = msg.content.split(" ");
        if (
          args[1].toLowerCase() === "serpent" ||
          args[1].toLowerCase() === "snake"
        ) {
          msg.reply("Bravo ! ;D");
          msg.channel.send(
            "Tu arrives au bout de cet éprouvant parcours ! Je t'invite à te renseigner sur le QRCode suivant pour clore le tout !"
          );
          msg.channel.send(
            "https://media.discordapp.net/attachments/928431386342350848/933224878901964860/Unitag_QRCode_1642568419849.png"
          );
        } else {
          msg.reply("No. :(");
        }
      } else {
        msg.reply(
          "Bien joué à toi ! Te voici alors prête pour la prochaine énigme ! \n Entre !launch pour lancer le tout ! ||The following stuff is provided by Laureline !||"
        );
      }
    }
  }
});

/** Login on token */
client.login(TOKEN);
