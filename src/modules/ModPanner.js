import Module from '../core/Module.js';
import audioContext from '../core/audioContext.js';
import { inherits } from '../core/utils.js';

function ModPanner() {
	this.node = audioContext.createStereoPanner();
	Module.call(this);
}
inherits(ModPanner, Module);

ModPanner.prototype.descriptor = {
	type: 'ModPanner',
	name: 'ModPan',
	size: 2,
	inputs:  { 
		IN:  { type: 'audio', x:3.5,  y:0, endPoint: 'node',     label: 'IN'  },
		pan: { type: 'param', x:0.0,  y:1, endPoint: 'node.pan', label: 'PAN' },
	},
	outputs: { OUT: { type: 'audio', x:3.5,  y:1,   endPoint: 'node', label: 'OUT' } }
};

export default ModPanner;