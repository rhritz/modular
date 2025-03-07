import Module from '../core/Module.js';
import { inherits } from '../core/utils.js';

function AutoBang() {
	this.data     = null;
	this.duration = 5;
	this.timeout  = null;

	Module.call(this);

	this.scheduleNext();
}
inherits(AutoBang, Module);

AutoBang.prototype.onDataIn = function (data) {
	this.data = data;
};

AutoBang.prototype.scheduleNext = function () {
	/* var t = this;
	this.timeout = window.setTimeout(function () {
		t.$OUT.emit(t.data); // this.data
		t.scheduleNext();
	}, this.duration * 1000);
	*/
	
	this.timeout = window.setTimeout(() => {
        // Arrow functions preserve the "this" value from the surrounding context
        this.$OUT.emit(this.data);
        this.scheduleNext();
    }, this.duration * 1000);
};

AutoBang.prototype.remove = function () {
	// cancel timeout on unload
	if (this.timeout !== null) {
		window.clearTimeout(this.timeout);
		this.timeout = null;
	}
	Module.prototype.remove.call(this);
};

//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
AutoBang.prototype.descriptor = {
	type: 'AutoBang',
	name: 'AutoBang',
	size: 2,
	inputs:  { IN:  { type: 'event', x:0,  y:1, label: 'DATA', endPoint: 'onDataIn' } },
	outputs: { OUT: { type: 'event', x:2.3,  y:1 } },
	controls: {
		duration: { type: 'knob', x: 4.0, y: 0.1, min: 1, max: 10, value: 'duration' },
	}
};

export default AutoBang;