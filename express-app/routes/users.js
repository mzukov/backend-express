var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const users = {
    items: [
      {
        id: 1,
        name: "Иван Петров"
      },
      {
        id: 2,
        name: "Мария Сидорова"
      },
      {
        id: 3,
        name: "Алексей Иванов"
      },
      {
        id: 4,
        name: "Елена Смирнова"
      },
      {
        id: 5,
        name: "Дмитрий Кузнецов"
      }
    ]
  };
  res.json(users);
});

module.exports = router;