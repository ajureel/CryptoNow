fetch("https://everything-crypto.p.rapidapi.com/v1/news/all", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "everything-crypto.p.rapidapi.com",
		"x-rapidapi-key": "b91b877c22mshd3e572293d3937ep172fe9jsn8af600c77cdc"
	}
})
.then(response => response.json())
.then(response => {
	console.log(response);
    console.log(response.content);
})
.catch(err => {
	console.error(err);
});


