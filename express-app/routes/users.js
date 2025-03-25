var express = require('express');
var router = express.Router();

/* GET users listing. */

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

router.get('/', function(req, res, next) {
  res.json(users);
});

router.post('/', function(req, res, next) {
  // Проверяем, есть ли имя пользователя в теле запроса
  if (!req.body.name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  // Создаем нового пользователя
  const newUser = {
    id: users.items.length + 1, // Просто увеличиваем ID на 1
    name: req.body.name
  };

  // Добавляем пользователя в массив
  users.items.push(newUser);

  // Возвращаем созданного пользователя с кодом 201 (Created)
  res.status(201).json(newUser);
});

module.exports = router;