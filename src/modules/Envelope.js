import Module from '../core/Module.js';
import { inherits, map } from '../core/utils.js';
import audioContext from '../core/audioContext.js';

function Envelope() {
	Module.call(this);
}
inherits(Envelope, Module);

Envelope.prototype.onTrigger = function () {
	var currentTime = audioContext.currentTime;

	var ATTACK  = 1;
	var SUSTAIN = 1;
	var RELEASE = 2;

	this.$OUT.setAutomation(function (param, min, max) {
		var value = param.value;
		param.cancelScheduledValues(0);

		param.setValueAtTime(value, currentTime);
		param.linearRampToValueAtTime(max, currentTime + ATTACK);
		param.setValueAtTime(max, currentTime + ATTACK + SUSTAIN);
		param.linearRampToValueAtTime(min, currentTime + ATTACK + SUSTAIN + RELEASE);
	});
};

Envelope.prototype.descriptor = {
	type: 'Envelope',
	name: 'Envelope',
	size: 2,
	inputs:  { TRG: { type: 'event', x:0,    y:1, label: 'TRG', endPoint: 'onTrigger' } },
	outputs: { OUT: { type: 'param', x:3.5,  y:1, label: 'OUT' } },
	controls: {}
};

export default Envelope;