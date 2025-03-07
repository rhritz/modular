import Connector from '../core/Connector.js';
import * as constants from './constants.js';
import {createDiv} from './domUtils.js';

Connector.prototype.initGUI = function (module, id, descriptor) {
	var dom = this._dom = createDiv('connector ' + this.cssClassName, module._dom);
	if (descriptor.label) createDiv('label connectorLabel', dom).innerText = descriptor.label;

	if (this.x === undefined) {
		// TODO: remove this
		dom.style.position = 'relative'
	} else {
		dom.style.left = (this.x * constants.CONNECTOR_GRID_SIZE + 1) + 'px';
		dom.style.top  = (this.y * constants.CONNECTOR_GRID_SIZE + 1) + 'px';
	}

	dom.connector = this;

	var t = this;
	dom.addEventListener('mousedown', function mouseStart(e) {
		console.log('Connector mousedown');
		e.stopPropagation();
		e.preventDefault();
		window.moduleManager.startConnection(t, e);
	});
};

Connector.prototype.setState = function () {
	this._dom.className = 'connector ' + this.cssClassName + (this._nConnection > 0 ? '-fill' : '');
};