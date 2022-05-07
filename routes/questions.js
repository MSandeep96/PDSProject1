var express = require("express");
var router = express.Router();
const conn = require("../db/conn");

/* GET questions for topic page. */
router.get("/", function (req, res, next) {
  const query = req.query;
  let qString = "";
  if (query.topicId) {
    qString += `tid = '${query.topicId}'`;
  }
  if (query.userId) {
    if (qString.length > 0) {
      qString += ` and username = '${query.userId}'`;
    } else {
      qString += `username = '${query.userId}'`;
    }
  }
  if (qString.length > 0) {
    qString = `where ${qString}`;
  }
  const sql = `select * from Question natural join topic ${qString} order by timePosted desc limit 15`;
  conn.query(sql, function (err, result) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json({ ques: result });
    }
  });
});

router.get("/:questionId", function (req, res, next) {
  const query = req.params.questionId;
  const sql = `select * from Question natural join topic where qid = '${query}'`;
  conn.query(sql, function (err, result) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(result[0]);
    }
  });
});

router.post("/", function (req, res, next) {
  const query = req.body;
  const sql = `insert into Question (username, tid, title, body, timePosted) values ('${query.username}', '${query.topic}', '${query.title}', '${query.body}', now())`;
  conn.query(sql, function (err, result) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json({ ques: result });
    }
  });
});

module.exports = router;
