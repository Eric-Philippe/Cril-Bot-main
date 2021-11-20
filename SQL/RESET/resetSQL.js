require("require-sql");

const { con } = require("../../utils/mysql");

const query_Users = require("./Users.sql");
const query_Reminder = require("./Reminder.sql");
const query_Concerner = require("./Concerner.sql");

exports.resetSQL = function () {
  con.query(query_Concerner, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    con.query(query_Users, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      con.query(query_Reminder, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
      });
    });
  });
};
