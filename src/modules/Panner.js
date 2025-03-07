import Module from '../core/Module.js';
import audioContext from '../core/audioContext.js';
import { inherits } from '../core/utils.js';

function Panner() {
	this.node = audioContext.createStereoPanner();
	Module.call(this);
}
inherits(Panner, Module);

Panner.prototype.descriptor = {
	type: 'Panner',
	name: 'Pan',
	size: 2,
	inputs:   { IN:  { type: 'audio', x:3.5,  y: 0, endPoint: 'node', label: 'IN'  } },
	outputs:  { OUT: { type: 'audio', x:3.5,  y: 1, endPoint: 'node', label: 'OUT' } },
	controls: { pan: { type: 'knob',  x: 1.5, y: 0, min: -1, max: 1, endPoint: 'node.pan', value: 'value' } }
};

export default Panner;