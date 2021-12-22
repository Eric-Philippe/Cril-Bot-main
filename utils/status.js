const { client } = require("./client"); //Client object

const { SERVER, ROLES } = require("../ressources.json"); // Ressources needed
const { ELEMENT } = require("./status.json"); // All the template sentences

/**
 * Edit the status of the bot with personnalized users and setences randomly picked
 */
const statusEdit = function () {
  let guild = client.guilds.cache.find((g) => g.id === SERVER.ID); // Find the Guild target
  if (!guild) return; // Error Handler

  let compos = ELEMENT[getRandomInt(ELEMENT.length)]; // Element of the picked sentence (Sentence + number of replacement needed)
  let new_txt = compos[0]; // Sentence
  let num_int = compos[1]; // Number of modifications

  let member = undefined; // Member randomly picked
  let members_array = []; // Members already picked
  let name_array = []; // Final name wich will replaced the $ template

  let mod_roles = []; // Classic ModRoles Array
  let indice = getRandomInt(101); // Pick a number between 0 and 100

  // ============ ModRole PUSH ==================
  let ResponsableRole = guild.roles.cache.find(
    (r) => r.id === ROLES.MOD_ROLES[0]
  );
  if (ResponsableRole) mod_roles.push(ResponsableRole);
  let TuteurRole = guild.roles.cache.find((r) => r.id === ROLES.MOD_ROLES[1]);
  if (TuteurRole) mod_roles.push(TuteurRole);
  let TuteurAsRole = guild.roles.cache.find((r) => r.id === ROLES.MOD_ROLES[2]);
  if (TuteurAsRole) mod_roles.push(TuteurAsRole);

  let balise = false; // userFinded

  // Loop all around the amount of member needed
  for (let i = 0; i < num_int; i++) {
    balise = false; // Reset
    let x = 0; // Counter of operation
    // Loop while user wasnt finded
    while (!balise) {
      if (x > 2000) {
        // We don't want to loop more than 2000 times
        // plus Handle infinite loop by no result avaiable
        name_array.push("Le vide"); // Add default name
        balise = true; // Leave the loop
      }
      member = guild.members.cache.random(); // Pick random users

      // ======================= Steps filter ==========================
      // ========================= Not a Bot ===========================
      // == With à chance of 65% => the first user picked is an Admin ==
      // == ==================== => If admin doesn't have nickname =====
      // == ====================== => Second Choice : User.Username ====
      // == Default for everyone : Member.Nickname (First element) =====
      // ================== Classic member need to be connected=========
      // ===============================================================
      if (!member.user.bot) {
        // If user isn't a bot
        if (!members_array.includes(member)) {
          // If user doest not appear already
          if (i === 0 && indice <= 65) {
            // First user => Admin appear ratio
            if (member.roles.cache.some((r) => mod_roles.includes(r))) {
              // If user is an admin
              if (member.nickname) {
                // If the admin have a nickname
                name_array.push(member.nickname); // Member.Nickname
              } else {
                name_array.push(member.user.username); // User.username
              }
              members_array.push(member); // Add the user "Already Picked"
              balise = true; // Leave the loop
            }
          } else {
            let validPresence = ["online", "dnd", "idle"]; // Accepted state of presence
            if (member.presence) {
              // Check if presence exists
              if (validPresence.includes(member.presence.status)) {
                // If user is on Discord
                if (member.nickname) {
                  // If the user have a nickname (here needed)
                  name_array.push(member.nickname.split(" ")[0]); // Add the surname
                  members_array.push(member); // Add the user "Already Picked"
                  balise = true; // Leave the loop
                }
              }
            }
          }
        }
      }
      x = x + 1; // One "while" loop done
    }
    new_txt = new_txt.replace("$", name_array[i]); // Replace the "i"th element of the sentence
  }

  client.user.setActivity("regarder " + new_txt); // Change the activity

  // Loop all the 5 minutes
  setTimeout(() => {
    statusEdit();
  }, 1000 * 60 * 5);
};

// Classic random int picker
const getRandomInt = function (max) {
  // max - 1
  return Math.floor(Math.random() * max);
};

module.exports.statusEdit = statusEdit; // Export
