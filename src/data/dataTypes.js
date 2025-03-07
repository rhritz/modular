/*
var DATA_TYPES = {
	'BufferData':       require('./BufferData'),
	'ProceduralBuffer': require('./ProceduralBuffer')
};
*/

import BufferData from './BufferData.js';
import ProceduralBuffer from './ProceduralBuffer.js';

export const DATA_TYPES = {
  'BufferData': BufferData,
  'ProceduralBuffer': ProceduralBuffer
};

export function deserialize(data) {
	var type = data._type;
	var DataType = DATA_TYPES[type];
	if (!DataType) return data;
	return DataType.deserialize(data);
}

export function initializeDatabase(database) {
	for (var id in database) {
		var data = database[id];
		if (!data.id) data.id = id;
		database[id] = deserialize(data);
	}
};

