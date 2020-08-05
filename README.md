# Tinkoff Invest API to json
Поднимается socket-connection, который слушает изменения по стаканам и пишет обновления в JSON-чики в папку `/tickers/`.

## Использование
Установить и запустить в консоли с тикерами через запятую:
```
npm i
npm start -- AAPL,FLWS,ABBV,ATVI,ADBE,AKAM,BABA
```

## Token
Положить в корень файлик `.env` и прописать там токен:
```
TOKEN=123asdASD321
```