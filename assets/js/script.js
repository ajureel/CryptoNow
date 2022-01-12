// Elements
var apiTestEl = document.getElementById('apiTest');


// Global Vars


// Global Constants
const blockchainKy = ""; //key may take 2-3 days.  There are some apis that do not require authentication
const coincapKy = "";


// ************ API Connections **********
// Base URL:    https://api.blockchain.com/v3/exchange
// Ticker URL:  https://api.blockchain.com/v3/exchange/tickers

var getTicker = function() {
    //this blockchain ticker does not require authentication/key
    var requestUrl = 'https://api.blockchain.com/v3/exchange/tickers'
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        //Using console.log to examine the data
        console.log(data);

        apiTestEl

        var currentHeaderEl = document.createElement('h');
        var currentSymbolEl = document.createElement('p');
        var currentLastTradePriceEl = document.createElement('p');
        var currentPrice_24hEl = document.createElement('p');
        var currentVolumeEl = document.createElement('p');
                
        currentHeaderEl.innerText = "Blockchain API Test";
        currentSymbolEl.innerText = "Symbol: " + data[0].symbol;
        currentLastTradePriceEl.innerText = "Last Price: " + data[0].last_trade_price;
        currentPrice_24hEl.innerText = "Humidity: " + data[0].price_24h;
        currentVolumeEl.innerText = "UV Index: " +  data[0].volume_24h;

        apiTestEl.append(currentHeaderEl, currentSymbolEl, currentLastTradePriceEl, currentLastTradePriceEl, currentPrice_24hEl, currentVolumeEl);


       });
  }

getTicker();