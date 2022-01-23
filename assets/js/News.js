var EverythingCryptoE1 = document.getElementById('EverythingCrypto');

var obfuscateMyStack = "3fa5e051521ce9ae2bbc50c936bb99d9";

var getNews = function (myKeyword) {
    var MediaStackURL = "http://api.mediastack.com/v1/news?access_key=";
    MediaStackURL = MediaStackURL + obfuscateMyStack + "&countries=us&sources=cnn,bloomberg&keywords=crypto&languages=en&limit=10" + myKeyword;
    console.log(MediaStackURL);
  
	fetch(MediaStackURL)
      .then(function(data) {
        if (data.ok) {
          data.json()
          .then(function(data) {            
             //Using console.log to examine the data
              console.log(data);
              console.log(data.data[0].author);
			  console.log(data.data.length);

			  for (i = 0; i < data.data.length; i++) {

				  // Create the elements of the card
				  var myArticleEl = document.createElement('article');
				  var myAEl = document.createElement('a'); //needs href set to data[i].url
				  var myImgDivEl = document.createElement('div');
				  var myImgEl = document.createElement('img'); //src set to data[i].image
				  var myFieldsDivEl = document.createElement('div');
				  var myTitleEl = document.createElement('h1'); //.title
				  var mySourceEl = document.createElement('h2');//.source
				  var myDLEl = document.createElement('dl');
				  var myDtEl = document.createElement('dt');//"Author"
				  var myDDEl = document.createElement('dd');//.author


				  console.log(data.data[i].author);


				  //   // Set the element attributes
				  myAEl.setAttribute('class', 'link dt w-100 bb b--black-10 pb2 mt2 dim blue');
				  myAEl.setAttribute('href', data.data[i].url);
				  myImgDivEl.setAttribute('class', 'dtc w3');
				  myImgEl.setAttribute('class', 'db w-100');
				  //myImgEl.setAttribute('src',data.data[0].image);
				  myFieldsDivEl.setAttribute('class', 'dtc v-top pl2');
				  myTitleEl.setAttribute('class', 'f6 f5-ns fw6 lh-title black mv0');
				  myTitleEl.innerText = data.data[i].title;
				  mySourceEl.setAttribute('class', 'f6 fw4 mt2 mb0 black-60');
				  mySourceEl.innerText = data.data[i].source;
				  myDLEl.setAttribute('class', 'mt2 f6');
				  myDtEl.setAttribute('class', 'clip');
				  myDtEl.innerText = "Author: ";
				  myDDEl.setAttribute('class', 'm10');
				  myDDEl.innerText = data.data[i].author;

				  // //   //Build the card
				  myDLEl.append(myDtEl, myDDEl);
				  myFieldsDivEl.append(myTitleEl, mySourceEl, myDLEl);
				  //myImgDivEl.append(myImgEl);
				  myAEl.append(myFieldsDivEl);
				  myArticleEl.append(myAEl);

				  EverythingCryptoE1.append(myArticleEl);
			  }//end for loop
            });
        } else {
          //alert("Error!");
		  var errorEl = document.createElement('p');
		  errorEl.innerText = "Error: News Failed to Load!"
		  EverythingCryptoE1.append();
        };
        });
  
  };
  
  getNews('non fungible tokens');
  //console.log("test");



