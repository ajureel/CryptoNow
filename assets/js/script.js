// Elements


// Global Vars


// Global Constants
const blockchainKy = "";
const coincapKy = "";

// https://api.blockchain.com/v3/exchange

//https://api.blockchain.com/v3/exchange/tickers

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
       });
  }

getTicker();