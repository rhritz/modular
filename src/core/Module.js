import * as connectors from './connectors.js';
import Knob from './Knob.js';
import Button from './Button.js';

const CONTROL_BY_TYPE = {
	knob: Knob,
	button: Button
};

/** Main abstract class for modules. Handle UI display.
 *
 * @author Cedric Stoquer
 */
function Module() {
	this.patch  = null; // reference to the patch where the module belong
	this.id     = null; // id of this module in the patch
	this.x      = null; // position in patch's grid
	this.y      = null;
	this.cables = {};

	this.initGUI();
	this.createInterface();

	// if any, keep constructor arguments for serialization
	if (arguments.length) {
		this._arguments = [];
		for (var i = 0; i < arguments.length; i++) {
			var argument = arguments[i];
			if (argument.serialize) {
				this._arguments.push(argument.serialize());
			} else {
				this._arguments.push(argument);
			}
		}
	}
}

Module.prototype.descriptor = {
	// type:     'type',   // Type of the module for serialization. It should be an unique id 
	// name:     'name',   // How the module appears in the library UI. if null, it won't be registered
	// size:     1,        // Height of the module in rack units (see constants.MODULE_HEIGHT)
	// inputs:   {},       // List of input connectors.  An input  `id` is added as a property `$id`
	// outputs:  {},       // List of output connectors. An output `id` is added as a property `$id`
	// controls: {},       // List of controls (Knob, Buttons, etc.) see CONTROL_BY_TYPE
	// persistent: []      // List of persistent data that has to be saved during module serialization.
	// tag:        []      // List of tags. Used for filter and search in library
};

Module.prototype.createInterface = function () {
	console.log('createInterface uz runninng');
	console.log(this.descriptor);
	if (this.descriptor.inputs) {
		for (var id in this.descriptor.inputs) {
			var input = this.descriptor.inputs[id];
			var ConnectorConstructor = connectors.getConnector('input', input.type);
			if (ConnectorConstructor) this['$' + id] = new ConnectorConstructor(this, id, input);
		}
	}

	if (this.descriptor.outputs) {
		for (var id in this.descriptor.outputs) {
			console.log('lolo:');
			console.log(id);
			var output = this.descriptor.outputs[id];
			console.log(output);
			var ConnectorConstructor = connectors.getConnector('output', output.type);
			console.log(ConnectorConstructor);
			if (ConnectorConstructor) this['$' + id] = new ConnectorConstructor(this, id, output);
		}
	}

	if (this.descriptor.controls) {
		for (var id in this.descriptor.controls) {
			var controlDescriptor = this.descriptor.controls[id];
			var controlConstructor = CONTROL_BY_TYPE[controlDescriptor.type];
			this['$$' + id] = new controlConstructor(this, id, controlDescriptor);
		}
	}
};

Module.prototype.rebind = function () {
	if (this.descriptor.inputs) {
		for (var id in this.descriptor.inputs) {
			if (this['$' + id]) this['$' + id].bind(this, id, this.descriptor.inputs[id]);
		}
	}

	if (this.descriptor.outputs) {
		for (var id in this.descriptor.outputs) {
			if (this['$' + id]) this['$' + id].bind(this, id, this.descriptor.outputs[id]);
		}
	}

	if (this.descriptor.controls) {
		for (var id in this.descriptor.controls) {
			if (this['$$' + id]) this['$$' + id].bind(this, id, this.descriptor.controls[id]);
		}
	}
};

/** Set module position in UI surface */
Module.prototype.setPosition = function (x, y) {
	this.x = x;
	this.y = y;
};

/** Remove module */
Module.prototype.remove = function () {
	// disconnect all connectors
	for (var id in this.cables) {
		this.patch.removeCable(this.cables[id]);
	}
};

Module.prototype.addCable = function (cable) {
	this.cables[cable.id] = cable;
};

Module.prototype.removeCable = function (cable) {
	delete this.cables[cable.id];
};

/** Get module state for patch saving */
Module.prototype.getState = function () {
	var state = {
		_type: this.descriptor.type,
		id:    this.id,
		x:     this.x,
		y:     this.y
	};

	// constructor arguments
	if (this._arguments) {
		state.arguments = this._arguments;
	}

	// controls (Knob, etc.)
	if (this.descriptor.controls) {
		state.controls = {};
		for (var id in this.descriptor.controls) {
			if (!this['$$' + id].getState) continue;
			state.controls[id] = this['$$' + id].getState();
		}
	}

	// persistent data (e.g. Filter type)
	var persistent = this.descriptor.persistent;
	if (persistent) {
		state.persistent = [];
		for (var i = 0; i < persistent.length; i++) {
			state.persistent.push(this[persistent[i]]);
		}
	}

	return state;
};

Module.prototype.setState = function (state) {
	// controls
	if (state.controls) {
		for (var id in this.descriptor.controls) {
			if (!state.controls[id]) continue;
			this['$$' + id].setState(state.controls[id]);
		}
	}

	// persistent data
	if (state.persistent) {
		for (var i = 0; i < this.descriptor.persistent.length; i++) {
			var id = this.descriptor.persistent[i];
			// TODO: persistent of type 'something.thing'
			this[id] = state.persistent[i];
		}
	}
};

Module.prototype.initGUI      = function () {};
Module.prototype.select       = function () {};
Module.prototype.deselect     = function () {};
Module.prototype.setTitle     = function () {};
Module.prototype.setColor     = function () {};
Module.prototype.setBorder    = function () {};
Module.prototype.addClassName = function () {};

export default Module;
