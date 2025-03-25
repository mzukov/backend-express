var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();

// Создаем и подключаем базу данных
const db = new sqlite3.Database('mydb.db', (err) => {
    if (err) {
        console.error('Ошибка при подключении к БД', err);
    } else {
        console.log('Подключено к SQLite');
    }
});

// Создаем таблицу пользователей, если её нет
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
)`);

// Получение списка пользователей
router.get('/', function (req, res, next) {
    db.all("SELECT id, name FROM users", [], (err, rows) => {
        if (err) {
            console.error('Ошибка при получении пользователей', err);
            res.status(500).json({ error: 'Ошибка сервера' });
        } else {
            res.json({ items: rows });
        }
    });
});

// Создание нового пользователя
router.post('/', function (req, res, next) {
    if (!req.body.name) {
        return res.status(400).json({ error: 'Name is required' });
    }

    const insert = "INSERT INTO users (name) VALUES (?)";
    db.run(insert, [req.body.name], function (err) {
        if (err) {
            console.error('Ошибка при добавлении пользователя', err);
            return res.status(500).json({ error: 'Ошибка сервера' });
        }

        res.status(201).json({ id: this.lastID, name: req.body.name });
    });
});

module.exports = router;
