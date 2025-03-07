/** @module domUtils
 *  @desc dom utilities
 *  @author Cedric Stoquer
 */
var DOCUMENT_BODY = document.getElementsByTagName('body')[0];

export function createDom(type, className, parent) {
	parent = parent || DOCUMENT_BODY;
	var dom = document.createElement(type);
	parent.appendChild(dom);
	if (className) dom.className = className;
	return dom;
};

export function createDiv(className, parent) {
	return createDom('div', className, parent);
};

export function removeDom(dom, parent) {
	parent = parent || DOCUMENT_BODY;
	parent.removeChild(dom);
};

export function makeButton(dom, onClic) {
	dom.addEventListener('mousedown', function (e) {
		e.stopPropagation();
		e.preventDefault();
		onClic(e, dom);
	});
	return dom;
};

function startDrag(dom, e) {
	var d = document;

	var rect = dom.getBoundingClientRect();

	var startX = e.clientX - rect.left;
	var startY = e.clientY - rect.top;

	function dragMove(e) {
		e.preventDefault();
		dom.style.left = (e.clientX - startX) + 'px';
		dom.style.top  = (e.clientY - startY) + 'px';
	}

	function dragEnd(e) {
		e.preventDefault();
		d.removeEventListener('mouseup',   dragEnd);
		d.removeEventListener('mousemove', dragMove);
	}

	d.addEventListener('mousemove', dragMove, false);
	d.addEventListener('mouseup',   dragEnd,  false);
}

export function makeDragable(handle, target) {
	target = target || handle;
	handle.addEventListener('mousedown', function (e) {
		e.stopPropagation();
		e.preventDefault();
		startDrag(target, e);
	});
	return handle;
};
