
var nav = new Vue({
	el:'#nav',
	data: {
		currentBrand: null,
		currentModel: null,
		currentEngine: null,
		brands: null,
		models: null,
		engines: null,
		currentBrandImgSrc: null,
		currentModelImgSrc: null,
		currentBrandName: null,
		currentModelName: null,
		currentEngineName: null
	},
	methods: {
		getBrands: function() {
			axios.get('../php/main.php?fun=getBrands').then(function(response) {
				var result = JSON.stringify(response.data);
				result = JSON.parse(result);
				nav.brands = result;
			})
		},
		getModels: function() {
			axios.get('../php/main.php?fun=getModels&brand='+this.currentBrand.id).then(function(response) {
				var result = JSON.stringify(response.data);
				result = JSON.parse(result);
				nav.currentModel = null;
				nav.currentModelName = null;
				nav.currentModelImgSrc = null;
				nav.engines = null;
				nav.currentEngineName = null;
				nav.models = result;
			})
		},
		getEngines: function() {
			axios.get('../php/main.php?fun=getEngines&model='+nav.currentModel.id).then(function(response) {
				var result = JSON.stringify(response.data);
				result = JSON.parse(result);
				nav.currentEngine = null;
				nav.currentEngineName = null;
				nav.engines = result;
			})
		},
		changeBrand: function(event) {
			this.currentBrandImgSrc = this.currentBrand.img_src;
			nav.currentBrandName = nav.currentBrand.name;
			serv.clearChecked();
			expense.calc();
			this.getModels();
		},
		changeModel: function(event) {
			this.currentEngine = null;
			serv.clearChecked();
			expense.calc();
			if (nav.currentModel != null){
				nav.currentModelName = nav.currentModel.name;
				nav.currentModelImgSrc = nav.currentModel.img_src;
				this.getEngines();
			}
			nav.findServices();
		},
		findServices: function() {
			if (this.currentBrand != null && this.currentModel != null && this.currentEngine != null) {
				nav.currentEngineName = this.currentEngine.name;
				serv.findServices();
			}
			else {
				serv.services = null;
			}
		}
	}
});

nav.getBrands();

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
			this.clearChecked();
			if (nav.currentEngine != null &&
				nav.currentBrand != null &&
				nav.currentModel != null) {
			axios.get('../php/main.php?fun=findServices&brand='+nav.currentBrand.id+'&model='+nav.currentModel.id +'&engine='+nav.currentEngine.code).then(function(response) {
				var result = JSON.stringify(response.data);
				result = JSON.parse(result);
				serv.services = result;
				serv.partTypesForService = [];
				serv.getPartTypesForService();
			})
			} else {
				alert("Для поиска услуг вы должны выбрать бренд, модель и двигатель своего автомобиля");
			}
		},
		clearChecked: function() {
			serv.checkedService = [];
				serv.checkedPartTypes = [];
				serv.checkedParts = [];
		},
		getPartTypesForService: function() {
			
				axios.get('../php/main.php?fun=getPartTypes').then(function(response) {
					var result = JSON.stringify(response.data);
					result = JSON.parse(result);
					serv.partTypesForService=result;
					serv.getPartsForCar();
				})
			},
		getPartsForCar:function() {
			axios.get('../php/main.php?fun=getPartsForCar&brand=' + nav.currentBrand.id +
				'&model=' + nav.currentModel.id + '&engine='+
				nav.currentEngine.code).then(function(response) {
					var result = JSON.stringify(response.data);
					result = JSON.parse(result);
					serv.partsForCar=result;
		})
		},
		checkChanges: function(serviceForCarId, partTypeId) {
			if (partTypeId != null) {
				serv.checkedParts.forEach(function(item, i) {
					if (item.service_for_car_id == serviceForCarId && item.part_type_id == partTypeId) {
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
			expense.addPart(part);
		}
	
}
});

var expense = new Vue({
	el: '#expenses',
	data: {
		work: 0,
		parts: 0,
		
	},
	methods: {
		findServices: function() {
			nav.findServices();
		},
		calc: function() {
			expense.work = 0;
			expense.parts = 0;
			if (serv.checkedService != [] && serv.checkedParts != []) {
				serv.checkedService.forEach(function(item) {
					expense.work += Number(item.price);
				});
				serv.checkedParts.forEach(function(item) {
					expense.parts += Number(item.price) * Number(item.count);
				});
			} 
		},
		addPart: function(part) {
			serv.checkedParts.forEach(function(item, i) {
				if (part.service_for_car_id == item.service_for_car_id && part.part_type_id == item.part_type_id) {
					serv.checkedParts.splice(i, 1);
				}
			});
			serv.checkedParts.push(part);
			expense.calc();
		}
	}
});