// Elements
var coinSearchBtnEl = document.getElementById('coinSearchBtn');
var mySearchBxEl = document.getElementById('mySearchBx');
var searchResultsEl = document.getElementById('searchResults');
var searchHistoryDivEl = document.getElementById('searchHistoryDiv');
var myModalEl = document.getElementById("myModal");
var myErrorTextEl = document.getElementById("errorTextP");
var ModalCloseEl = document.getElementById("x");


// Global Vars
var obfuscateMe = "b6581e5631f74d709c61e26b094e5e0a";
var obfuscatePart = "X-API-KEY";
var searchBtnsAry = new Array();
var searchHistoryAry = new Array();

// Global Constants
const blockchainKy = ""; //key may take 2-3 days.  There are some apis that do not require authentication

// ********* Debug and helper functions
var myConsoleLog = function (objName, obj) {
  console.log(objName + ": " + obj);
}

// When the user clicks on <span> (x), close the modal
//ModalCloseEl.addEventListener("click", function (){myModalEl.style.display = "none";});

ModalCloseEl.addEventListener('click', function (myEvent) {
  myModalEl.style.display = "none";
});


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == myModalEl) {
    myModalEl.style.display = "none";
  }
}

//Load History from local storage
var loadHistory = function() {
  searchHistoryAry = JSON.parse(localStorage.getItem("searchHistoryAry"));
  
    // if nothing in localStorage, return
    if (!searchHistoryAry) {
      searchHistoryAry = [];
        return;
    }
    
    // loop over object properties and add buttons
    for (i=0; i<searchHistoryAry.length; i++){
        // console.log(weatherHistory[i].city, weatherHistory[i].lat, weatherHistory[i].lon);
        //addCityBtn(searchHistoryAry[i].city, searchHistoryAry[i].lat, searchHistoryAry[i].lon);
        if (searchHistoryAry[i].historyType=="getBlockChainItem") {addHistoryBtn(searchHistoryAry[i].historyText,  searchHistoryAry[i].historyType, searchHistoryAry[i].historyResult);}
    };
};

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
  localStorage.setItem('searchHistoryAry', JSON.stringify(searchHistoryAry));
  console.log(JSON.parse(window.localStorage.getItem('searchHistoryAry')));
  //saveHistory();
}

var addHistoryBtn = function (searchText, searchType, myURL) {
  console.log("addHistoryBtn");
  myConsoleLog("searchText", searchText);
  myConsoleLog("searchType", searchType);
  myConsoleLog("resultObject", myURL);

  var historyBtn = document.createElement('button');
  historyBtn.setAttribute("class", "items-center f6 grow no-underline br-pill ba bw2 ph3 pv2 mb2 dib dark-green");
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
            var myArticleEl = document.createElement('li');
            // var myArticleEl = document.createElement('article');
            var myImgEl = document.createElement('img');
            var myFieldsDivEl = document.createElement('div');
            var myCurNameEl = document.createElement('a');
            var last_tradeEl = document.createElement('p');
            var price_24hEl = document.createElement('p');
            // var volume_24hEl = document.createElement('p');
      
            // last_trade_price: 43498.23
            // price_24h: 42917.75
            // symbol: "BTC-USD"
            // volume_24h: 186.53045485
      
            // Set the element attributes
            myArticleEl.setAttribute('class', 'flex items-center lh-copy pa3 ph0-l bb b--black-10');
            myImgEl.setAttribute('class', 'w2 h2 w3-ns h3-ns br-100');
            // myImgEl.setAttribute('class', 'db');
            myFieldsDivEl.setAttribute('class', 'pl3 flex-auto');
            myCurNameEl.setAttribute('class', 'f15 db link light-blue hover-blue');
            last_tradeEl.setAttribute('class','f10 db white-70')
            price_24hEl.setAttribute('class','f10 db white-70')
      
            // populate the data from the API results
            myCurNameEl.innerText = "Symbol: " + data.symbol;
            last_tradeEl.innerText = "Last Trade: $" + data.last_trade_price;
            price_24hEl.innerText = "Price: $" + data.price_24h;
            // volume_24hEl.innerText = "Volume: " + data.volume_24h;
            if (data.last_trade_price > data.price_24h) { //trading is higher than current price so get on the wagon and buy!
              myImgEl.setAttribute("src", "./assets/images/Up.jpg");
            } else {
              myImgEl.setAttribute("src", "./assets/images/Down.jpg");
            };
      
            myImgEl.setAttribute("alt", "Buy or Sell Image");
      
            //Build the card
            myFieldsDivEl.append(myCurNameEl, price_24hEl, last_tradeEl);
            // myFieldsDivEl.append(myCurNameEl, price_24hEl, last_tradeEl, volume_24hEl);
            myArticleEl.append(myImgEl, myFieldsDivEl);
      
            // currently this only displays one at a time.  It would be cool to put these in an array and build up to displaying multiple. 
            // ie future change to display 5, when adding a new one, remove the oldest
            searchResultsEl.innerHTML = "";
            searchResultsEl.append(myArticleEl);
      
            // add to history
            createHistory(myBlockchainSymbol, "getBlockChainItem", "");
      
          });
      } else {
        errorModal("Currency Not Found!");
        mySearchBxEl.value = '';
      };
      });

};

var errorModal = function(myerror){
  myErrorTextEl.innerText = myerror;
  myModalEl.style.display = "block";

};


coinSearchBtnEl.addEventListener('click', getBlockChainItem);
searchHistoryDivEl.addEventListener('click', function (myEvent) {
  reloadHistoryBtn(myEvent);
});

// searchResultsEl.addEventListener('click', function (myEvent) {
//     reloadCity(myEvent);
// });
loadHistory();
