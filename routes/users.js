var express = require("express");
var router = express.Router();
const conn = require("../db/conn");

/* GET users listing. */
router.post("/login", function (req, res, next) {
  const body = req.body;
  const username = body.username;
  const password = body.password;
  const sql = `SELECT * FROM user WHERE username = '${username}' AND password = '${password}'`;
  conn.query(sql, function (err, result) {
    if (err) {
      res.status(500).json(err);
    } else {
      if (result.length === 0) {
        res.sendStatus(401);
      } else {
        res.status(200).json(result);
      }
    }
  });
});

router.post("/register", (req, res, next) => {
  const body = req.body;
  const sql = `INSERT INTO user (username, password, email, profile, city, state, country) VALUES ('${body.username}', '${body.password}', '${body.email}', '${body.profile}', '${body.city}', '${body.state}', '${body.country}')`;
  conn.query(sql, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(201).json(result);
    }
  });
});

router.get("/status/:userId", (req, res, next) => {
  const userId = req.params.userId;
  const sql = `select case when sum(upvotes) < 100 then 'Basic'
  when sum(upvotes) < 200 then 'Advanced'
        else 'Expert' end as Status from Answers where auser="${userId}" group by auser`;
  conn.query(sql, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(result[0]);
    }
  });
});

module.exports = router;
