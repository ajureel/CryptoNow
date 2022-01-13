// Elements
var apiTestEl = document.getElementById('apiTest');
var coincapTestEl = document.getElementById('coincapTest');

// Global Vars


// Global Constants
const blockchainKy = ""; //key may take 2-3 days.  There are some apis that do not require authentication
const coincapKy = ""; //as of 1/12 8:48 est coincap documentation site was down.

// ********* Debug and helper functions

  var myConsoleLog = function (objName, obj) {
    console.log(objName + ": " + obj);
  }

// ************ API Connections **********
// Blockchain - Documentation - https://api.blockchain.com/v3/#/unauthenticated/
// Base URL:    https://api.blockchain.com/v3/exchange
// Ticker URL:  https://api.blockchain.com/v3/exchange/tickers

// CoinCap -  Documentation - https://docs.coincap.io/
// restful API Documentation: https://docs.coincap.io/#ee30bea9-bb6b-469d-958a-d3e35d442d7a

var getBlockChainTicker = function() {
    //this blockchain ticker does not require authentication/key
    
    requestUrl = 'https://api.blockchain.com/v3/exchange/tickers';
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        //Using console.log to examine the data
        console.log(data);

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

  var getCoinCapTicker = function() {
       
    requestUrl = 'https://api.coincap.io/v2/assets/bitcoin';
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        //Using console.log to examine the data
        console.log(data);

        var currentHeaderEl = document.createElement('h');
        var currentSymbolEl = document.createElement('p');
        var currentLastTradePriceEl = document.createElement('p');
        var currentPrice_24hEl = document.createElement('p');
        var currentVolumeEl = document.createElement('p');
                
        // currentHeaderEl.innerText = "Blockchain API Test";
        // currentSymbolEl.innerText = "Symbol: " + data[0].symbol;
        // currentLastTradePriceEl.innerText = "Last Price: " + data[0].last_trade_price;
        // currentPrice_24hEl.innerText = "Humidity: " + data[0].price_24h;
        // currentVolumeEl.innerText = "UV Index: " +  data[0].volume_24h;

        // coincapTestEl.append(currentHeaderEl, currentSymbolEl, currentLastTradePriceEl, currentLastTradePriceEl, currentPrice_24hEl, currentVolumeEl);


       });
  }

  getBlockChainTicker();
  getCoinCapTicker();


  