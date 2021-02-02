# Bachend for telegram bot
# Available Scripts

In the project directory, you can run:

1. npm install - установка нужных библиотек
2. npm run - запуск бэкенда

Runs the app in the development mode.\
Server will be available in [http://localhost:9000](http://localhost:9000).


example .env:

PORT=9000 // порт, на котором будет висеть бэкенд

HOST=localhost // host базы данных

USER=postgres // user базы данных

PASSWORD=root // пароль базы данных

DB_PORT=5432 // порт базы данных

DB=test  //названии базы данных

dialect=postgres // диалект базы данных

max=5 максимальное кол-во соединений в пуле (Default: 5)

min=0  //минимальное кол-во соединений в пуле (Default: 0)

acquire=30000 //время в миллисекундах, в течение которого будет осуществляться попытка установить соединение, прежде чем будет сгенерировано исключение (Default: 60000)

idle=10000 //время простоя в миллисекундах, по истечении которого соединение покинет пул (Default: 1000)
