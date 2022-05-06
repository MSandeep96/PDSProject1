var express = require("express");
var router = express.Router();
const conn = require("../db/conn");

/* GET topics listing. */
router.get("/:searchTerm", function (req, res, next) {
  const searchterm = req.params.searchTerm;
  const sql = `select *,
  IF (title like "%${searchterm}%", 20,0)
  + IF(body like "%${searchterm}%", 10,0)
  + IF(answer like "%${searchterm}%", 5,0)
  as weight
 from Question natural join Answers
 where 
  (title like "%${searchterm}%" or body like "%${searchterm}%" or answer like "%${searchterm}%")
order by weight DESC;`;
  conn.query(sql, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send({ ques: result });
    }
  });
});

module.exports = router;
