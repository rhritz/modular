import {createDom, createDiv, makeButton, removeDom} from '../domUtils.js';
import {GRID_SIZE}  from './constants.js';

function Container(parent) {
	this.dom = createDiv('synthEdit-container', parent.dom);
}

/** set size in unit (grid based) */
Container.prototype.rect = function(x, y, w, h) {
	this.dom.style.left   = x * GRID_SIZE + 'px';
	this.dom.style.top    = y * GRID_SIZE + 'px';
	this.dom.style.width  = w * GRID_SIZE - 20 + 'px';
	this.dom.style.height = h * GRID_SIZE - 20 + 'px';
	return this;
};

export default Container;