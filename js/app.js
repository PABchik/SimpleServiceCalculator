//alert("Js here");

var app = new Vue({
    el: '#app',
    data: {
        products: [],
		id: 111
    },
    mounted: function() {
        var that = this;
        
    }
});

axios.get('../test.php').then(response => {app.id = response.data;});