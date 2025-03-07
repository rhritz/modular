import Module from '../core/Module.js';
import audioContext from '../core/audioContext.js';
import { inherits } from '../core/utils.js';

function Context() {
	this.node = audioContext;
	Module.call(this);
}
inherits(Context, Module);

Context.prototype.descriptor = {
	type: 'Context',
	name: 'Context',
	size: 1,
	inputs: { DEST: { type: 'audio', x:3,  y:0, endPoint: 'node.destination', label: 'DEST' } }
};

export default Context;