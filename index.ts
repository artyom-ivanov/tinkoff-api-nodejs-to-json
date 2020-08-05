import fs from 'fs';

import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/.env' });

import OpenAPI, { MarketInstrument } from '@tinkoff/invest-openapi-js-sdk';
const sandboxApiURL = 'https://api-invest.tinkoff.ru/openapi/sandbox/';
const socketURL = 'wss://api-invest.tinkoff.ru/openapi/md/v1/md-openapi/ws';
const sandboxToken = process.env.TOKEN;
const api = new OpenAPI({ apiURL: sandboxApiURL, secretToken: sandboxToken as string, socketURL });

!(async function run() {
  const tickers = process.argv[2].split(',');
  await api.sandboxClear();

  // Table of tickers and last updated time
  const tableStatus: {[index: string]:any} = {}
  tickers.forEach(t => {
    tableStatus[t] = null;
  })

  // Function to save and render output table
  async function connect(ticker: string) {
    const marketInstrument = await api.searchOne({ ticker: ticker }) as MarketInstrument;
    const { figi } = marketInstrument;
  
    api.orderbook({ figi, depth: 10 }, (x) => {
      fs.writeFile(`tickers/${ticker}.json`, JSON.stringify(x),  function(err) {
        
        if (err) { console.log("ERR: "+err) }

        tableStatus[ticker] = new Date().toLocaleTimeString();
        
        console.clear();
        console.table(tableStatus);
      
      });      
    });
  }

  // Running
  for (const ticker of tickers) {
    await connect(ticker);
  }

})();