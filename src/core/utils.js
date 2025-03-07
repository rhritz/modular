/**
 * Utility functions
 */
//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
/** map a value from an input interval [iMin ~ iMax] to an output interval [oMin ~ oMax] 
 * preconditions: iMin != iMax
 */
export function map(value, iMin, iMax, oMin, oMax) {
	return oMin + (oMax - oMin) * (value - iMin) / (iMax - iMin);
}

//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
/** Make a deep copy of an object */
// function copyObject(object) {

// 	function copyObject(source) {
// 		if (typeof source === 'object') {
// 			if (Array.isArray(source)) {
// 				var arrayCopy = [];
// 				for (var i = 0; i < source.length; i++) {
// 					arrayCopy.push(copyObject(source[i]));
// 				}
// 				return arrayCopy;
// 			} else {
// 				// we assume it's a map object
// 				var objectCopy = {};
// 				for (var key in source) {
// 					objectCopy[key] = copyObject(source[key]);
// 				}
// 				return objectCopy;
// 			}
// 		} else {
// 			// we assume it is a simple type
// 			return source;
// 		}
// 	}

// 	return copyObject(object);
// }

export function copyObject(object) {
	return JSON.parse(JSON.stringify(object));
}

export function inherits(ctor, superCtor) {
     ctor.super_ = superCtor;
     ctor.prototype = Object.create(superCtor.prototype, {
         constructor: {
             value: ctor,
             enumerable: false,
             writable: true,
             configurable: true
         }
     });
}