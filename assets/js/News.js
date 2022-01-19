var EverythingCryptoE1 = document.getElementById('EverythingCrypto');

var = "b91b877c22mshd3e572293d3937ep172fe9jsn8af600c77cdc";

// RapidApi Api Documention- https://docs.rapidapi.com/

//var EverythingCrypto = function (myKeyword) {
	var EverythingCryptourl = "https://everything-crypto.p.rapidapi.com/v1/news/all";
		EverythingCrypto = EverythingCrypto + 
	};

	myConsoleLog("options", JSON.stringify(options));


	fetch("https://everything-crypto.p.rapidapi.com/v1/news/all")
		.then(function (response){
			return response.json();
		})
		.then(function (data) {
			console.log('here');
			console.log(data);

			for (i = 0; i < data.asset_events.length; i++) {
				var mySectionEl = document.createElement('section');
        		var myArticleEl = document.createElement('article');
        		var myFieldsDivEl = document.createElement('div');
        		var mysourceNameEl = document.createElement('a');

				var linkEl = document.createElement('p');
        		var sourceEl = document.createElement('p');
        		var titleEl = document.createElement('p');

				mySectionEl.setAttribute('class', 'tc pa3 pa5-ns');
        		myArticleEl.setAttribute('class', 'w-25 hide-child relative ba b--black-20 mw5 center');
        		myFieldsDivEl.setAttribute('class', 'pa2 bt b--black-20');
        		mysourceNameEl.setAttribute('class', 'f6 db link dark-blue hover-blue');

				if (data.asset_events[i].asset.name) { mysourceNameEl.innerText = "SourceName: " + data.asset_events[i].asset.name; };
        			linkEl.innerText = "Event: " + data.asset_events[i].event_type;
        			myImgEl.setAttribute("src", data.asset_events[i].asset.image_preview_url);
        			myImgEl.setAttribute("alt", "Crypto Article");
        			linkEl.innerText = data.asset_events[i].asset.description;

				if (data.asset_events[i].title) {
					currentUSDPriceEl.innerText =(data.asset_events[i].title);
				};

				myFieldsDivEl.append(mysourceNameEl, linkEl, titleEl);
        		myArticleEl.append(myImgEl, myFieldsDivEl);

				EverythingCryptoE1.append(myArticleEl);
				
			}
		})
};	





