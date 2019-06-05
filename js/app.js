
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
				nav.models = result;
			})
		},
		getEngines: function() {
			axios.get('../php/main.php?fun=getEngines&model='+nav.currentModel.id).then(function(response) {
				var result = JSON.stringify(response.data);
				result = JSON.parse(result);
				nav.engines = result;
			})
		},
		changeBrand: function(event) {
			this.currentBrandImgSrc = this.currentBrand.img_src;
			this.currentBrandName = nav.currentBrand.name;
			this.clearCurrentModel();
			this.clearCurrentEngine();
			serviceVue.clearServices();
			expense.calc();
			this.getModels();
		},
		changeModel: function(event) {
			this.clearCurrentEngine();
			serviceVue.clearServices();
			expense.calc();
			if (nav.currentModel != null){
				nav.currentModelName = nav.currentModel.name;
				nav.currentModelImgSrc = nav.currentModel.img_src;
				this.getEngines();
			}
		},
		changeEngine: function() {
			if (this.currentBrand != null && this.currentModel != null && this.currentEngine != null) {
				nav.currentEngineName = this.currentEngine.name;
				serviceVue.clearChecked();
				serviceVue.findServices();
			}
			else {
				serviceVue.clearServices();
			}
		},
		clearCurrentEngine: function() {
			this.currentEngine = null;
			this.currentEngineName = null;
		},
		clearCurrentModel: function() {
			this.currentModel = null;
			this.currentModelImgSrc = null;
			this.currentModelName = null;
		}
	}
});

nav.getBrands();

var serviceVue = new Vue({
	el: '#services',
	data: {
		services: null,
		checkedService: [],
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
				serviceVue.services = result;
				serviceVue.getPartTypesForService();
			})
			} else {
				alert("Для поиска услуг вы должны выбрать бренд, модель и двигатель своего автомобиля");
			}
		},
		clearChecked: function() {
			serviceVue.checkedService = [];
				serviceVue.checkedPartTypes = [];
				serviceVue.checkedParts = [];
				expense.calc();
		},
		clearServices: function() {
			this.clearChecked();
			this.services = null;
			this.partTypesForService = null;
			this.partsForCar = null;
		},
		getPartTypesForService: function() {
				axios.get('../php/main.php?fun=getPartTypes').then(function(response) {
					var result = JSON.stringify(response.data);
					result = JSON.parse(result);
					serviceVue.partTypesForService=result;
					serviceVue.getPartsForCar();
				})
			},
		getPartsForCar:function() {
			axios.get('../php/main.php?fun=getPartsForCar&brand=' + nav.currentBrand.id +
				'&model=' + nav.currentModel.id + '&engine='+
				nav.currentEngine.code).then(function(response) {
					var result = JSON.stringify(response.data);
					result = JSON.parse(result);
					serviceVue.partsForCar=result;
		})
		},
		checkChanges: function(serviceForCarId, partTypeId) {
			if (partTypeId != null) {
				serviceVue.checkedParts.forEach(function(item, i) {
					if (item.service_for_car_id == serviceForCarId && item.part_type_id == partTypeId) {
						serviceVue.checkedParts.splice(i, 1);
						serviceVue.checkChanges(serviceForCarId, partTypeId);
					}
				});
			} else {
				serviceVue.checkedPartTypes.forEach(function(item, i) {
					if (item.service_for_car_id == serviceForCarId) {
						serviceVue.checkedPartTypes.splice(i, 1);
						serviceVue.checkChanges(serviceForCarId);
					}
				});
				serviceVue.checkedParts.forEach(function(item, i) {
					if (item.service_for_car_id == serviceForCarId) {
						serviceVue.checkedParts.splice(i, 1);
						serviceVue.checkChanges(serviceForCarId);
					}
				});	
			}
			expense.calc();
		},
		calcExpense: function() {
			expense.calc();
		},
		addPart:function(part, serviceForCarId) {
			serviceVue.checkedParts.forEach(function(item, i) {
				if (serviceForCarId == item.service_for_car_id && part.part_type_id == item.part_type_id) {
					serviceVue.checkedParts.splice(i, 1);
				}
			});
			serviceVue.checkedParts.push(part);
			expense.calc();
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
		calc: function() {
			expense.work = 0;
			expense.parts = 0;
			if (serviceVue.checkedService.length > 0) {
				serviceVue.checkedService.forEach(function(item) {
					expense.work += Number(item.price);
				});
				serviceVue.checkedParts.forEach(function(item) {
					expense.parts += Number(item.price) * Number(item.count);
				});
			} 
		}
	}
});


var form = new Vue({
	el: '#form',
	data: {
		name: "",
		vin: "",
		dopInfo: "",
		res: null
	},
	methods: {
		sendMail: function() {
			if (nav.currentBrand != null &&
				nav.currentModel != null &&
				nav.currentEngine != null &&
				this.vin != null &&
				this.name != null &&
				serviceVue.checkedService.length > 0) {
			var infoForTicket = {
				parts: null,
				services: null
			};
			infoForTicket.parts = serviceVue.checkedParts;
			infoForTicket.services = serviceVue.checkedService;
			axios.post('../php/main.php?fun=addTicket&' +
				'name=' + form.name +
				'&brand=' + nav.currentBrand.id + 
				'&model='+ nav.currentModel.id + 
				'&engine=' + nav.currentEngine.code + 
				'&total=' + (expense.work + expense.parts) + 
				'&vin=' + form.vin,
				"body="+JSON.stringify(infoForTicket)
				).then(function(response) {
					alert(response.data);
					alert(serviceVue.checkedParts);
			});
				axios.get('../php/main.php?fun=getCurrentTicketId').then(function(response) {
				var result = JSON.stringify(response.data);
				result = JSON.parse(result);
				form.res = result;
			});
			serviceVue.clearServices();
			nav.clearCurrentEngine();
			this.clearFields();
		}
	},
	clearFields: function() {
		this.vin = "";
		this.name = "";
	}
	}
});