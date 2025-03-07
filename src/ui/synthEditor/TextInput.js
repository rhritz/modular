import {createDom, createDiv, makeButton, removeDom} from '../domUtils.js';
import {GRID_SIZE}  from './constants.js';
import {map} from '../../core/utils.js';

function TextInput(parent) {
	this.editor      = parent; // TODO: should we allow parent to be any else than editor?
	this.dom         = createDom('input', 'synthEdit-textInput', parent.dom);
	this._obj        = null;
	this._attribute  = null;
	this._autoUpdate = false;

	this.dom.type = 'text';
	this._initMouseEvents();
}

TextInput.prototype.bind = function (obj, attribute) {
	this._obj = obj;
	this._attribute = attribute;

	this.dom.value = obj[attribute];
	return this;
};

TextInput.prototype.autoUpdate = function () {
	this._autoUpdate = true;
	return this;
};

TextInput.prototype.position = function (x, y, w) {
	this.dom.style.left  = x * GRID_SIZE + 'px';
	this.dom.style.top   = y * GRID_SIZE + 'px';
	this.dom.style.width = w * GRID_SIZE + 'px';
	return this;
};

TextInput.prototype._initMouseEvents = function () {
	var self = this;
	this.dom.addEventListener('change', function (e) {
		if (!self._obj) return;
		self._obj[self._attribute] = self.dom.value;
		if (self._autoUpdate) {
			self.editor.updateBuffer();
		}
	});
};

export default TextInput;