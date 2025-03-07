import {createDom, createDiv, makeButton, removeDom} from '../domUtils.js';
import {GRID_SIZE}  from './constants.js';

function Label(parent) {
	this.dom = createDiv('synthEdit-label', parent.dom);
}

Label.prototype.position = function (x, y, w) {
	this.dom.style.left  = x * GRID_SIZE + 'px';
	this.dom.style.top   = y * GRID_SIZE + 'px';
	this.dom.style.width = w * GRID_SIZE + 'px';
	return this;
};

Label.prototype.text = function (text) {
	this.dom.innerText = text;
	return this;
};

Label.prototype.color = function (color) {
	this.dom.style.color = constants.getColor(color).hi;
	return this;
};

export default Label;