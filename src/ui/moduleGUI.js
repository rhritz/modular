import { inherits } from '../core/utils.js';
import {createDom, createDiv, makeButton, removeDom} from './domUtils.js';
import audioEditor from './audioEditor.js';
import * as constants from './constants.js';
import Module from '../core/Module.js';
import Buffer from '../core/Buffer.js';
import * as synthEditor from './synthEditor/index.js';
// var audioEditor = require('./audioEditor');
// var constants   = require('./constants');
// var Module      = require('../core/Module');
// var Buffer      = require('../core/Buffer');
// var synthEditor = require('./synthEditor');

Module.prototype.initGUI = function () {
	var dom = createDiv('module x' + this.descriptor.size, null);
	this._title = createDom('span', '', dom);
	this._title.textContent = this.descriptor.name;
	this._dom = dom;
	dom.style.left = (-10 - constants.MODULE_WIDTH) + 'px';

	dom.module = this;

	var t = this;
	dom.addEventListener('mousedown', function mouseStart(e) {
		window.moduleManager.startDrag(t, e);
	});
};

Buffer.prototype.initGUI = function () {
	Module.prototype.initGUI.call(this);

	var t = this;

	// edit buffer
	this._dom.addEventListener('dblclick', function () {
		if (!t.buffer) return;

		// if (t.buffer.type === 'ProceduralBuffer') {
		var synthId = t.buffer.synthesizer;
		if (synthId && synthEditor.hasEditor(synthId)) {
			// this is a procedural buffer with an editor
			synthEditor.open(synthId, t.buffer);
			return;
		}

		audioEditor.setBuffer(t.buffer);
		audioEditor.open();
	});
};

Module.prototype.setTitle = function (title) {
	this._title.textContent = title;
};

Module.prototype.setColor = function (color) {
	this._dom.style.backgroundColor = color;
};

Module.prototype.setBorder = function (color) {
	this._dom.style.borderColor = color;
};

Module.prototype.addClassName = function (className) {
	this._dom.className += ' ' + className;
};

Module.prototype.select = function () {
	this._title.className = 'selected';
};

Module.prototype.deselect = function () {
	this._title.className = '';
};

/** Set module position in UI surface */
Module.prototype.setPosition = function (x, y) {
	this.x = x;
	this.y = y;

	var style = this._dom.style;
	style.left = (constants.MODULE_WIDTH  * x) + 'px';
	style.top  = (constants.MODULE_HEIGHT * y) + 'px';

	for (var id in this.cables) this.cables[id].update();
};

/** Remove module */
Module.prototype.remove = function () {
	// disconnect all connectors
	for (var id in this.cables) {
		this.patch.removeCable(this.cables[id]);
	}
	removeDom(this._dom, null);
};
