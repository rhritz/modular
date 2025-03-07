var MODULES_CONSTRUCTOR_BY_ID = {};

export function add(ModuleConstructor, category) {
	var descriptor = ModuleConstructor.prototype.descriptor;
	descriptor._category = category;
	MODULES_CONSTRUCTOR_BY_ID[descriptor.type] = ModuleConstructor;
};

export function getModuleConstructor(type) {
	return MODULES_CONSTRUCTOR_BY_ID[type];
};

export function getList() {
	return MODULES_CONSTRUCTOR_BY_ID;
};
