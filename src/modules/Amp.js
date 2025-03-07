import Module from '../core/Module.js';
import audioContext from '../core/audioContext.js';
import { inherits } from '../core/utils.js';

function Amp() {
	this.node = audioContext.createGain();
	this.node.gain.value = 0;
	Module.call(this);
}
inherits(Amp, Module);

Amp.prototype.descriptor = {
	type: 'Amp',
	name: 'Amp',
	size: 2,
	inputs:  { 
		IN:  { type: 'audio', x:0.0,  y:1, endPoint: 'node',      label: 'IN'  },
		MOD: { type: 'param', x:3.5,  y:0, endPoint: 'node.gain', label: 'MOD' },
	},
	outputs: { OUT: { type: 'audio', x:3.5,  y:1,   endPoint: 'node', label: 'OUT' } }
};

export default Amp;