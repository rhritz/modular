import { sendRequest } from '../loaders/sendRequest.js';

var FLAGS = {
	audio: false
};

export function setFlag(id) {
	FLAGS[id] = true;
};

window.onbeforeunload = function beforeClosing() {
	if (FLAGS.audio) sendRequest({ command: 'audio.generateLibrary' });
};
