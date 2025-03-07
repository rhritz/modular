// var audioContext = require('../core/audioContext');
import audioContext from '../core/audioContext.js';

function loadAudioBuffer(uri, cb) {
	var xobj = new XMLHttpRequest();
	xobj.responseType = 'arraybuffer';

	xobj.onreadystatechange = function onXhrStateChange() {
		if (~~xobj.readyState !== 4) return;
		if (~~xobj.status !== 200 && ~~xobj.status !== 0) {
			return cb('xhrError:' + xobj.status);
		}
		audioContext.decodeAudioData(xobj.response, function onSuccess(buffer) {
			return cb(null, buffer);
		}, cb);
	};

	xobj.open('GET', uri, true);
	xobj.send();
};

export default loadAudioBuffer;