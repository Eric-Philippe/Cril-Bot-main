require("require-sql");

const { con } = require("../../utils/mysql");

const query_Users = require("./INSERT_USERS.sql");
const query_Reminder = require("./INSERT_REMINDER.sql");
const query_Concerner = require("./INSERT_CONCERNER.sql");
const query_Users_READ = require("../READ/USER_ID_FILTER.sql");

exports.insertSQL = async function (reminder) {
  con.query(
    query_Users_READ, // EXIST OR NOT
    [reminder.users_id[0]],
    function (err, result, fields) {
      if (err) throw err;
      if (result.length === 0) {
        con.query(
          query_Users, // ADD ONE
          [reminder.users_id[0]],
          function (err, result, fields) {}
        );
      }
    }
  );

  await con.query(
    query_Reminder, // ADD REMINDER
    [reminder.current_date, reminder.target_date, reminder.remind],
    async function (err, result, fields) {
      if (err) throw err;
      insertID = await result.insertId;
      console.log(insertID);
      await con.query(
        query_Concerner,
        [insertID, reminder.users_id[0]],
        async function (err, result, fields) {
          if (err) throw err;
        }
      );
    }
  );

  let insertID;
};
