import {resetCanvas} from './overlay.js';
import moduleManager from './moduleManager.js';

var timeout = null;

window.addEventListener('resize', function (e) {
	if (timeout !== null) {
		window.clearTimeout(timeout);
	}

	timeout = window.setTimeout(function () {
		resetCanvas();
		moduleManager.drawCables();
		timeout = null;
	}, 50);
});