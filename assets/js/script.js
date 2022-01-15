// Elements
var apiTestEl = document.getElementById('apiTest');
var coincapTestEl = document.getElementById('coincapTest');
var OpenSeaEventsEl = document.getElementById('OpenSeaEvents');
var coinSearchBtnEl = document.getElementById('coinSearchBtn');
var nftSearchBtnEl = document.getElementById('nftSearchBtn');

// Global Vars
var obfuscateMe = "b6581e5631f74d709c61e26b094e5e0a";
var obfuscatePart = "X-API-KEY";

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

  var getOpenSeaAssets = function() {
       
    requestUrl = 'https://api.opensea.io/api/v1/events?only_opensea=false&offset=0&limit=20';
    //requestUrl = 'https://api.opensea.io/api/v1/assets?&order_direction=desc&offset=0&limit=20';
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        //Using console.log to examine the data
        console.log("OpenSea");
        console.log(data);

       });
  }
  
var getOpenSeaEvents = function(){
    var options = {
      method: 'GET',
      headers: {Accept: 'application/json', 'X-API-KEY': obfuscateMe}
    };
    
    myConsoleLog("options", JSON.stringify(options));

    fetch('https://api.opensea.io/api/v1/events?only_opensea=false&offset=0&limit=20', options)
      .then(function (response){
        return response.json();
      })
      .then(function(data){
        console.log('here');
        console.log(data);

        var currentHeaderEl = document.createElement('h');
        var currentNameEl = document.createElement('p');
        var currentEventTypeEl = document.createElement('p');
        var currentDescriptionEl = document.createElement('p');
        var currentUSDPriceEl = document.createElement('p');
        var currentImageEl = document.createElement('img');
                
        currentHeaderEl.innerText = "OpenSea Events Test";
        currentNameEl.innerText = "Name: " + data.asset_events[0].asset.name;
        currentEventTypeEl.innerText = "Event: " + data.asset_events[0].event_type;
        currentImageEl.setAttribute("src", data.asset_events[0].asset.image_preview_url);
        currentImageEl.setAttribute("alt", "NFT Preview");
        currentDescriptionEl.innerText = data.asset_events[0].asset.description;
        currentUSDPriceEl.innerText = "$" + data.asset_events[0].payment_token.usd_price;

        OpenSeaEventsEl.append(currentHeaderEl, currentNameEl, currentEventTypeEl, currentImageEl, currentDescriptionEl, currentUSDPriceEl);
      })
    
};  
  
var getBlockChainItem = function(){
  myConsoleLog("getBlockChainItem", "Start");
};

var getNFTItem = function(){
  myConsoleLog("getNFTItem", "Start");
};


coinSearchBtnEl.addEventListener('click', getBlockChainItem);
nftSearchBtnEl.addEventListener('click', getNFTItem);

// searchResultsEl.addEventListener('click', function (myEvent) {
//     reloadCity(myEvent);
// });

// TESTS - These need to be commented out once we finalize the UI and data placement
  getOpenSeaEvents();
  getBlockChainTicker();
  getCoinCapTicker();
 // getOpenSeaAssets();


  