
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

var nav = new Vue({
	el:'#nav',
	data: {
		currentBrand: null,
		currentModel: null,
		currentEngine: null,
		brands: null,
		models: null,
		engines: null
	},
	methods: {
		getBrands: function() {
			// alert('../php/main.php?entity=brand');
			axios.get('../php/main.php?entity=brand').then(function(response) {
				var result = JSON.stringify(response.data);
				result = JSON.parse(result);
				/*if (result != null)
					nav.currentBrand = result[0].id;*/
				nav.brands = result;
				// alert("end of get Brands " + this.brands);
				nav.getModels();
			})
		},
		getModels: function() {
			// alert(this.currentBrand);
			// alert("getModels()");
			// alert('../php/main.php?fun=findById&entity=model&id='+this.currentBrand+'&relatedEntity=brand');
			axios.get('../php/main.php?fun=findById&entity=model&id='+this.currentBrand+'&relatedEntity=brand').then(function(response) {
				var result = JSON.stringify(response.data);
				result = JSON.parse(result);
				currentModel: result[0].id;
				nav.models = result;
			})
		},
		changeBrand: function(event) {
			// alert("brand changed");
			this.currentBrand = event.target.value;
			this.getModels();
		}
	}
});

nav.getBrands();
/*axios.get('../php/main.php?entity=brand').then(function(response) {
				var result = JSON.stringify(response.data);
				result = JSON.parse(result);
				nav.brands = result;
			});*/