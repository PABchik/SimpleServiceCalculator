

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
		currentBrandId: null,
		currentModelId: null,
		currentEngineId: null,
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
				nav.brands = result;
				// alert("end of get Brands " + this.brands);
				// nav.getModels();
			})
		},
		getModels: function() {
			// alert(this.currentBrand);
			// alert("getModels()");
			// alert('../php/main.php?fun=findById&entity=model&id='+this.currentBrand+'&relatedEntity=brand');
			axios.get('../php/main.php?fun=findById&entity=model&id='+this.currentBrandId.id+'&relatedEntity=brand').then(function(response) {
				var result = JSON.stringify(response.data);
				result = JSON.parse(result);
				// alert("cur model will be null");
				nav.currentModelId = null;
				expense.currentModelName = null;
				nav.engines = null;
				nav.models = result;
			})
		},
		getEngines: function() {
			axios.get('../php/main.php?fun=findById&entity=engine_model&join=engine&on=code&relatedEntity=model&id='+this.currentModelId.id).then(function(response) {
				var result = JSON.stringify(response.data);
				result = JSON.parse(result);
				// alert("cur model will be null");
				nav.currentEngineId = null;
				expense.currentEngineName = null;
				nav.engines = result;
			})
		},
		changeBrand: function(event) {
			// alert("brand changed");
			this.currentBrandImgSrc = this.currentBrandId.img_src;
			expense.currentBrandImgSrc = nav.currentBrandImgSrc;
			expense.currentBrandName = nav.currentBrandId.name;
			// alert(nav.currentBrandImgSrc);
			nav.findServices();
			this.getModels();
		},
		changeModel: function(event) {
			// alert("ch mod");
			// this.currentModel = event.target.value;
			this.currentEngineId = null;
			expense.currentModelName = nav.currentModelId.name;
			nav.findServices();
			this.getEngines();
		},
		findServices: function() {
			// alert("findServices ");
			if (this.currentBrandId != null && this.currentModelId != null && this.currentEngineId != null) {
				// alert("true in fs");
				expense.currentEngineName = this.currentEngineId.name;
				serv.findServices();
			}
			else {
				// alert("false in fs");
				serv.services = null;
			}
		}
	}
});

nav.getBrands();
/*axios.get('../php/main.php?entity=brand').then(function(response) {
				var result = JSON.stringify(response.data);
				result = JSON.parse(result);
				nav.brands = result;
			});*/


var serv = new Vue({
	el: '#services',
	data: {
		services: null,
		checkedService: null,
		partTypesForService: null,
		checkedPartTypes:[],
		partsForCar: null,
		checkedParts: []
	},
	methods: {
		findServices: function() {
			// alert('../php/main.php?fun=findServices&brand='+nav.currentBrandId.id+'&model='+nav.currentModelId.id +'&engine='+nav.currentEngineId.code);
			if (nav.currentEngineId != null &&
				nav.currentBrandId != null &&
				nav.currentModelId != null) {
			axios.get('../php/main.php?fun=findServices&brand='+nav.currentBrandId.id+'&model='+nav.currentModelId.id +'&engine='+nav.currentEngineId.code).then(function(response) {
				var result = JSON.stringify(response.data);
				result = JSON.parse(result);
				// alert(result);
				serv.checkedService = [];
				serv.checkedPartTypes = [];
				serv.checkedParts = [];
				serv.services = result;
				serv.partTypesForService = [];
				/*serv.services.forEach(function(item, i) {
					// alert("interation inside " + i);
					serv.getPartTypesForService(item.id);
				})*/
				serv.getPartTypesForService();
				// alert(serv.services);
			})
			} else {
				alert("Для поиска услуг вы должны выбрать бренд, модель и двигатель своего автомобиля");
			}
				
				// alert("cur model will be null");
		},
		getPartTypesForService: function() {
			
				axios.get(/*'../php/main.php?fun=getPartTypes&id=' + serviceId*/'../php/main.php?fun=getPartTypes').then(function(response) {
					// alert('../php/main.php?fun=getPartTypes');

					var result = JSON.stringify(response.data);
					// alert(result);
					result = JSON.parse(result);
					serv.partTypesForService=result;
					// alert("Hi from get part types for service");
					serv.getPartsForCar();
				})
			},
		getPartsForCar:function() {
			/*alert('../php/main.php?fun=getPartsForCar&brand=' + nav.currentBrandId +
				'&model=' + nav.currentModelId + '&engine='+
				nav.currentEngineId);*/
			axios.get('../php/main.php?fun=getPartsForCar&brand=' + nav.currentBrandId.id +
				'&model=' + nav.currentModelId.id + '&engine='+
				nav.currentEngineId.code).then(function(response) {
					// alert('../php/main.php?fun=getPartTypes');

					var result = JSON.stringify(response.data);
					// alert('../php/main.php?fun=getPartsForCar&brand=' + nav.currentBrandId +
				// '&model=' + nav.currentModelId + '&engine='+
				// nav.currentEngineId);
					result = JSON.parse(result);
					serv.partsForCar=result;
		})
		},
		checkChanges: function(serviceForCarId, partTypeId) {
			if (partTypeId != null) {
				serv.checkedParts.forEach(function(item, i) {
					if (item.service_for_car_id == serviceForCarId && item.part_type_id == partTypeId) {
						// alert('good');
						serv.checkedParts.splice(i, 1);
						serv.checkChanges(serviceForCarId, partTypeId);
					}
				});
			} else {
				serv.checkedPartTypes.forEach(function(item, i) {
					if (item.service_for_car_id == serviceForCarId) {
						serv.checkedPartTypes.splice(i, 1);
						serv.checkChanges(serviceForCarId);
					}
				});
				serv.checkedParts.forEach(function(item, i) {
					if (item.service_for_car_id == serviceForCarId) {
						serv.checkedParts.splice(i, 1);
						serv.checkChanges(serviceForCarId);
					}
				});	
			}
			expense.calc();
		},
		calcExpense: function() {
			expense.calc();
		},
		addPart:function(part) {
			// alert("ADDD!");
			expense.addPart(part);
		}
	
}
});

var expense = new Vue({
	el: '#expenses',
	data: {
		v: "asdassasd",
		work: 0,
		parts: 0,
		currentBrandImgSrc: null,
		currentBrandName: null,
		currentModelName: null,
		currentEngineName: null
	},
	methods: {
		findServices: function() {
			// alert("click");
			nav.findServices();
		},
		calc: function() {
			expense.work = 0;
			expense.parts = 0;
			// var checkedServicesWithPrice = [];
			serv.checkedService.forEach(function(item) {
				// alert(item);
				expense.work += Number(item.price);
			});
			serv.checkedParts.forEach(function(item) {
				expense.parts += Number(item.price) * Number(item.count);
			});
			// alert("calc");

		},
		addPart: function(part) {
			serv.checkedParts.forEach(function(item, i) {
				if (part.service_for_car_id == item.service_for_car_id && part.part_type_id == item.part_type_id) {
					serv.checkedParts.splice(i, 1);
					// wasDeleted = true;
					// alert("before break");
					// break;
				}

			});
			// alert(wasDeleted);
			serv.checkedParts.push(part);
			expense.calc();
		}
		}
});