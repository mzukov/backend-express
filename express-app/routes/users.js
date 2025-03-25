var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const users = {
    items: [
      {
        id: 1,
        name: "Павел Егоров"
      },
      {
        id: 2,
        name: "Арсений Шур"
      },
      {
        id: 3,
        name: "Мария Филатова"
      },
      {
        id: 4,
        name: "Олег Расин"
      },
      {
        id: 5,
        name: "Александр Логинов"
      }
    ]
  };
  res.json(users);
});

module.exports = router;