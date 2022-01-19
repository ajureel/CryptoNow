// Elements
var apiTestEl = document.getElementById('apiTest');
var coincapTestEl = document.getElementById('coincapTest');
var OpenSeaEventsEl = document.getElementById('OpenSeaEvents');
var coinSearchBtnEl = document.getElementById('coinSearchBtn');
var nftSearchBtnEl = document.getElementById('nftSearchBtn');
var mySearchBxEl = document.getElementById('mySearchBx');
var searchResultsEl = document.getElementById('searchResults');
var searchHistoryDivEl = document.getElementById('searchHistoryDiv');

// Global Vars
var obfuscateMe = "b6581e5631f74d709c61e26b094e5e0a";
var obfuscatePart = "X-API-KEY";
var searchBtnsAry = new Array();
var searchHistoryAry = new Array();

// Global Constants
const blockchainKy = ""; //key may take 2-3 days.  There are some apis that do not require authentication
const coincapKy = ""; //as of 1/12 8:48 est coincap documentation site was down.

// ********* Debug and helper functions

var myConsoleLog = function (objName, obj) {
  console.log(objName + ": " + obj);
}

// create history and buttons
var createHistory = function (searchText, searchType, resultObject) {
  console.log("create button and history");

  // check to see if the city is already in our history
  if (searchBtnsAry) {
    for (i = 0; i < searchBtnsAry.length; i++) {
      if (searchBtnsAry[i].id == searchText) {
        console.log("test2");
        return; //do not add duplicate history
      }
    }
  }

  //Add the button
  addHistoryBtn(searchText, searchType, resultObject);

  //add to history array used to check for duplicates and save
  searchHistoryAry.push({ historyText: searchText, historyType: searchType, historyResult: resultObject });

  //save history to local storage
  //saveHistory();
}

var addHistoryBtn = function (searchText, searchType, myURL) {
  console.log("addHistoryBtn");
  myConsoleLog("searchText", searchText);
  myConsoleLog("searchType", searchType);
  myConsoleLog("resultObject", myURL);

  var historyBtn = document.createElement('button');
  historyBtn.setAttribute("class", "btn btn-block btn-primary ma2");
  historyBtn.setAttribute("type", "button");
  historyBtn.setAttribute("id", searchText);
  // what do we want to store from the data object?
  historyBtn.setAttribute("data-searchType", searchType);
  historyBtn.setAttribute("data-myURL", myURL);
  historyBtn.innerText = searchText;

  // myConsoleLog("historyBtn",historyBtn.outerHTML);
  // myConsoleLog("searchHistoryDivEl",searchHistoryDivEl.outerHTML);
  searchHistoryDivEl.append(historyBtn);
  searchBtnsAry.push(historyBtn);

}

var reloadHistoryBtn = function (myEvent) {
  myConsoleLog("reloadHistoryBtn", "start");
  var el = myEvent.target

  var reloadSearchText = el.id;
  var reloadSearchType = el.getAttribute('data-searchType');
  var reloadURL = el.getAttribute('data-myURL');
  // lon = el.getAttribute('data-lon');
  // console.log(city + " " + lat + " " +lon);
  // getWeatherApi();

  if (reloadSearchType == 'getBlockChainItem') {
    getBlockChainItem(reloadSearchText, "reloadHistoryBtn");
  } else if (reloadSearchType == 'getNFTItem'){
    getNFTItem(reloadSearchText, "getNFTItem", reloadURL);

  }
}


// ************ API Connections **********
// Blockchain - Documentation - https://api.blockchain.com/v3/#/unauthenticated/
// Base URL:    https://api.blockchain.com/v3/exchange
// Ticker URL:  https://api.blockchain.com/v3/exchange/tickers

// CoinCap -  Documentation - https://docs.coincap.io/
// restful API Documentation: https://docs.coincap.io/#ee30bea9-bb6b-469d-958a-d3e35d442d7a

var getBlockChainTicker = function () {
  //this blockchain ticker does not require authentication/key

  requestUrl = 'https://api.blockchain.com/v3/exchange/tickers';

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //Using console.log to examine the data
      console.log(data);

     
      var currentSymbolEl = document.createElement('p');
      var currentLastTradePriceEl = document.createElement('p');
      var currentPrice_24hEl = document.createElement('p');
      var currentVolumeEl = document.createElement('p');

      
      currentSymbolEl.innerText = "Symbol: " + data[0].symbol;
      currentLastTradePriceEl.innerText = "Last Price: " + data[0].last_trade_price;
      currentPrice_24hEl.innerText = "Price 24hrs Ago: " + data[0].price_24h;
      currentVolumeEl.innerText = "Current Volume: " + data[0].volume_24h;

      apiTestEl.append(currentSymbolEl, currentLastTradePriceEl, currentLastTradePriceEl, currentPrice_24hEl, currentVolumeEl);


    });
}

var getCoinCapTicker = function () {

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

var getOpenSeaAssets = function () {

  requestUrl = 'https://api.opensea.io/api/v1/events?only_opensea=false&offset=0&limit=20';

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

var getOpenSeaEvents = function () {
  var options = {
    method: 'GET',
    headers: { Accept: 'application/json', 'X-API-KEY': obfuscateMe }
  };

  myConsoleLog("options", JSON.stringify(options));

  fetch('https://api.opensea.io/api/v1/events?only_opensea=false&offset=0&limit=20', options)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log('here');
      console.log(data);

      for (i = 0; i < data.asset_events.length; i++) {

        // create Tachyons profile card for each NFT 
        // SEE: Example http://tachyons.io/components/cards/suggested-profile/index.html

        // Create the elements of the card
        var mySectionEl = document.createElement('section');
        var myArticleEl = document.createElement('article');
        var myImgEl = document.createElement('img');
        var myFieldsDivEl = document.createElement('div');
        var myNFTNameEl = document.createElement('a');
        var myAddBtnEl = document.createElement('button');

        var currentEventTypeEl = document.createElement('p');
        var currentDescriptionEl = document.createElement('p');
        var currentUSDPriceEl = document.createElement('p');

        // Set the element attributes
        mySectionEl.setAttribute('class', 'tc pa3 pa5-ns');
        myArticleEl.setAttribute('class', 'w-25 hide-child relative ba b--black-20 mw5 center');
        myImgEl.setAttribute('class', 'db');
        myFieldsDivEl.setAttribute('class', 'pa2 bt b--black-20');
        myNFTNameEl.setAttribute('class', 'f6 db link dark-blue hover-blue');

        // if (data.asset_events[i].event_type !== 'created'){
        // var myURL = 'https://api.opensea.io/api/v1/asset/'+data.asset_events[i].asset.asset_contract.address +'/'+data.asset_events[i].asset.token_id +'/';
        // var myfunction = 'createHistory("' + data.asset_events[i].asset.name + '","getNFTItem","'+ myURL + '")';
        // myAddBtnEl.setAttribute('onclick', myfunction);
        // myAddBtnEl.setAttribute('href', "javascript:void(0);");
        // myAddBtnEl.innerText = "Add to History";

      //}else 
      myAddBtnEl = document.createElement('a');
        //createHistory(myToken, "getNFTItem", myURL);
        //<a onclick="jsfunction()" href="javascript:void(0);"></a>

        //Do we need to set a class for event type, description, price?

        // populate the data from the API results
        if (data.asset_events[i].asset.name) { myNFTNameEl.innerText = "Name: " + data.asset_events[i].asset.name; };
        currentEventTypeEl.innerText = "Event: " + data.asset_events[i].event_type;
        myImgEl.setAttribute("src", data.asset_events[i].asset.image_preview_url);
        myImgEl.setAttribute("alt", "NFT Preview");
        currentDescriptionEl.innerText = data.asset_events[i].asset.description;

        if (data.asset_events[i].payment_token) {
          currentUSDPriceEl.innerText = "$" + Math.round(data.asset_events[i].payment_token.usd_price * 100) / 100;
          //currentUSDPriceEl.innerText = "$" + data.asset_events[i].payment_token.usd_price;
        };

        //Build the card
        myFieldsDivEl.append(myNFTNameEl, myAddBtnEl, currentEventTypeEl, currentUSDPriceEl);
        myArticleEl.append(myImgEl, myFieldsDivEl);
        // mySectionEl.append(myArticleEl);

        // Add the card
        OpenSeaEventsEl.append(myArticleEl);
      }

    })

};

var getBlockChainItem = function (myBtnText, caller) {
  myConsoleLog("getBlockChainItem", "Start");
  myConsoleLog("myBtnText", myBtnText);
  myConsoleLog("caller", caller);

  // Search for a coin
  var myBlockchainSymbol = '';
  if (caller !== undefined) {
    myBlockchainSymbol = myBtnText;
  } else {
    myBlockchainSymbol = mySearchBxEl.value.toUpperCase() + "-USD";
  };
  myConsoleLog("myBlockchainSymbol", myBlockchainSymbol);
  // https://api.blockchain.com/v3/exchange/tickers/BTC-USD
  // last_trade_price: 43498.23
  // price_24h: 42917.75
  // symbol: "BTC-USD"
  // volume_24h: 186.53045485
  requestUrl = 'https://api.blockchain.com/v3/exchange/tickers/' + myBlockchainSymbol;

  fetch(requestUrl)
    .then(function(data) {
      if (data.ok) {
        data.json()
        .then(function(data) {            
           //Using console.log to examine the data
            console.log(data);
      
            // create Tachyons profile card for each NFT 
            // SEE: Example http://tachyons.io/components/cards/suggested-profile/index.html
      
            // Create the elements of the card
            var myArticleEl = document.createElement('article');
            var myImgEl = document.createElement('img');
            var myFieldsDivEl = document.createElement('div');
            var myCurNameEl = document.createElement('a');
            var last_tradeEl = document.createElement('p');
            var price_24hEl = document.createElement('p');
            var volume_24hEl = document.createElement('p');
      
            // last_trade_price: 43498.23
            // price_24h: 42917.75
            // symbol: "BTC-USD"
            // volume_24h: 186.53045485
      
            // Set the element attributes
            myArticleEl.setAttribute('class', 'w-25 hide-child relative ba b--black-20 mw5 center');
            myImgEl.setAttribute('class', 'db');
            myFieldsDivEl.setAttribute('class', 'pa2 bt b--black-20');
            myCurNameEl.setAttribute('class', 'f6 db link dark-blue hover-blue');
      
            // populate the data from the API results
            myCurNameEl.innerText = "Symbol: " + data.symbol;
            last_tradeEl.innerText = "Last Trade: $" + data.last_trade_price;
            price_24hEl.innerText = "Price: $" + data.price_24h;
            volume_24hEl.innerText = "Volume: " + data.volume_24h;
            if (data.last_trade_price > data.price_24h) { //trading is higher than current price so get on the wagon and buy!
              myImgEl.setAttribute("src", "./assets/images/Up.jpg");
            } else {
              myImgEl.setAttribute("src", "./assets/images/Down.jpg");
            };
      
            myImgEl.setAttribute("alt", "Buy or Sell Image");
      
            //Build the card
            myFieldsDivEl.append(myCurNameEl, price_24hEl, last_tradeEl, volume_24hEl);
            myArticleEl.append(myImgEl, myFieldsDivEl);
      
            // currently this only displays one at a time.  It would be cool to put these in an array and build up to displaying multiple. 
            // ie future change to display 5, when adding a new one, remove the oldest
            searchResultsEl.innerHTML = "";
            searchResultsEl.append(myArticleEl);
      
            // add to history
            createHistory(myBlockchainSymbol, "getBlockChainItem", "");
      
          });
      } else {
        alert("Currency not found!");
      };
      });

};

var getNFTItem = function (myBtnText, caller, urlText='') {
  myConsoleLog("getNFTItem", "Start");
  myConsoleLog("myBtnText", myBtnText);
  myConsoleLog("caller", caller);

  var myURL = '';
 // Search for the NFT
 if (urlText !== ''){
   myURL=urlText;
 } else{
  
  if (caller !== undefined) {
    myNFT = myBtnText;
  } else {
    myNFT = mySearchBxEl.value.toUpperCase();
  };

  //test searching by token_id
  myToken = "459";//tokenID
  myAddress = '0xb8da418ffc2cb675b8b3d73dca0e3f10811fbbdd';//address

  myConsoleLog("myToken", myToken);
 var myURL = 'https://api.opensea.io/api/v1/asset/'+myAddress+'/'+myToken+'/';
  
 }

 var options = {
  method: 'GET',
  headers: { Accept: 'application/json', 'X-API-KEY': obfuscateMe }
};

myConsoleLog("options", JSON.stringify(options));
 
myConsoleLog("myURL",myURL);
  
  fetch(myURL, options)
    .then(function (response) {
      return response.json();
    })
      .then(function (data) {
        console.log('here');
        console.log(data);

        var iHaveData = false;
        try {
          console.log (data.image_preview_url);
          iHaveData = true;
          }
        catch (error) {
         console.log("preview does not exist.");
        }

        if (iHaveData){

          // create Tachyons profile card for each NFT 
          // SEE: Example http://tachyons.io/components/cards/suggested-profile/index.html

          // Create the elements of the card
          var myArticleEl = document.createElement('article');
          var myImgEl = document.createElement('img');
          var myFieldsDivEl = document.createElement('div');
          var myNFTNameEl = document.createElement('a');

          var currentEventTypeEl = document.createElement('p');
          var currentDescriptionEl = document.createElement('p');
          var currentUSDPriceEl = document.createElement('p');

          // Set the element attributes
          myArticleEl.setAttribute('class', 'w-25 hide-child relative ba b--black-20 mw5 center');
          myImgEl.setAttribute('class', 'db');
          myFieldsDivEl.setAttribute('class', 'pa2 bt b--black-20');
          myNFTNameEl.setAttribute('class', 'f6 db link dark-blue hover-blue');
          //Do we need to set a class for event type, description, price?

          // populate the data from the API results
          if (data.name) { myNFTNameEl.innerText = "Name: " + data.name; };
          myImgEl.setAttribute("src", data.image_preview_url);
          myImgEl.setAttribute("alt", "NFT Preview");
          currentDescriptionEl.innerText = data.description;

          // if (data.asset_events[i].payment_token) {
          //   currentUSDPriceEl.innerText = "$" + data.asset_events[i].payment_token.usd_price;
          // };

          //Build the card
          myFieldsDivEl.append(myNFTNameEl, currentEventTypeEl, currentDescriptionEl, currentUSDPriceEl);
          myArticleEl.append(myImgEl, myFieldsDivEl);
          // mySectionEl.append(myArticleEl);

          // Add the card
          // currently this only displays one at a time.  It would be cool to put these in an array and build up to displaying multiple. 
          // ie future change to display 5, when adding a new one, remove the oldest
          searchResultsEl.innerHTML = "";
          searchResultsEl.append(myArticleEl);

          // add to history
          createHistory(myToken, "getNFTItem", myURL);

        }//end for i
      })
    
  };



// searchResultsEl.addEventListener('click', function (myEvent) {
//     reloadCity(myEvent);
// });

// TESTS - These need to be commented out once we finalize the UI and data placement
getOpenSeaEvents();
 //getBlockChainTicker();
  // getCoinCapTicker();
 // getOpenSeaAssets();


