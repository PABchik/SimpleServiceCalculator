
var app = new Vue({
    el: '#brandModelSettings',
    data: {
		brands: null,
		id: 111,
		v: null,
		logos: null
    },
	methods: {
		inc: function() {
			this.v = "my test";
		},
		getDataFromDB: function() {
			this.v = axios.get("../php/main.php?entity=test_table").then(response => {app.v = response.data;});
		},
		getImgSrc: function() {
			alert("getImgSrc");
			axios.get('../php/main.php?entity=brand').then(function(response) {
				var result = JSON.stringify(response.data);
				alert(result);
				result = JSON.parse(result);
				this.logos = result;
			});
		}
	}
});

// axios.get("../php/main.php?entity=test_table").then(response => {app.v = response.data;});
app.getDataFromDB();
			axios.get('../php/main.php?entity=brand').then(function(response) {
				var result = JSON.stringify(response.data);
				result = JSON.parse(result);
				app.logos = result;
});
// axios.get('../php/main.php?entity=brand').then(response => {app.v = response.data;});	
//axios.get('../php/main.php?entity=brand').then(response => {app.brands = response.data;});
/*axios.get('../php/main.php?entity=brand').then(function(response) {
	var result = JSON.stringify(response.data);
	result = JSON.parse(result);
	app.brands = result;
});*/
