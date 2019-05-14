//alert("Js here");

var app = new Vue({
    el: '#brand',
    data: {
		v: null,
		id: 111
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
app.getDataFromDB();