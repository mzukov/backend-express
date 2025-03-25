var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// Логирование запросов
app.use(logger('dev'));

// Парсеры для тела запроса
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Middleware для проверки аутентификации
app.use((req, res, next) => {
    // Исключаем из проверки статические файлы и корневой маршрут
    if (req.path === '/' || req.path.startsWith('/public/')) {
        return next();
    }

    if (req.query.auth !== 'true') {
        return res.status(401).json({
            error: 'Unauthorized',
            message: 'Authentication required. Add ?auth=true to your request'
        });
    }

    next();
});

// Статические файлы
app.use(express.static(path.join(__dirname, 'public')));

// Роутеры
app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;