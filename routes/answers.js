var express = require("express");
var router = express.Router();
const conn = require("../db/conn");

/* GET questions for topic page. */
router.get("/", function (req, res, next) {
  const query = req.query;
  let qString = "";
  if (query.qid) {
    qString += `qid = '${query.qid}'`;
  }
  if (query.userId) {
    if (qString.length > 0) {
      qString += ` and auser = '${query.userId}'`;
    } else {
      qString += `auser = '${query.userId}'`;
    }
  }
  if (qString.length > 0) {
    qString = `where ${qString}`;
  }
  const sql = `select * from Question natural join Answers natural join topic ${qString} order by timeOfAnswer desc`;
  conn.query(sql, function (err, result) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json({ answ: result });
    }
  });
});

router.post("/", function (req, res, next) {
  const sql = `insert into Answers (qid, auser, answer, upvotes, is_best_answer, timeOfAnswer) values ('${req.body.qid}', '${req.body.auser}', '${req.body.answer}', '0', '0', now())`;
  conn.query(sql, function (err, result) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json({ answ: result });
    }
  });
});

router.post("/upvote", function (req, res, next) {
  const sql = `update Answers set upvotes = upvotes + 1 where qid = '${req.body.qid}' and auser = '${req.body.auser}'`;
  conn.query(sql, function (err, result) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json({ answ: result });
    }
  });
});

module.exports = router;
