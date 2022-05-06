var express = require("express");
var router = express.Router();
const conn = require("../db/conn");

/* GET topics listing. */
router.get("/", function (req, res, next) {
  const sql = `SELECT * FROM topic`;
  conn.query(sql, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

router.get("/heirarchy", (req, res, next) => {
  const sql = `SELECT * FROM heirarchy`;
  conn.query(sql, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

module.exports = router;
