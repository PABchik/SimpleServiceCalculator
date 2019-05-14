//alert("Js here");

var app = new Vue({
    el: '#brand',
    data: {
		brands: null,
		id: 111,
		v: null
    },
	methods: {
		inc: function() {
			this.v = "my test";
		},
		getDataFromDB: function() {
			this.v = axios.get("../php/main.php").then(response => {app.v = response.data;});
		}
	}
});

axios.get('../test.php').then(response => {app.id = response.data;});
axios.get('../php/main.php?entity=brand').then(response => {app.brands = response.data;});
axios.get('../php/main.php?entity=brand').then(function(response) {
	var result = JSON.stringify(response.data);
	result = JSON.parse(result);
	app.brands = result;
	//alert(result[0].text);
});
