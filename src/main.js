var domUtils     = require('domUtils');
var audioContext = require('./core/audioContext');
var BufferData   = require('./data/BufferData');

// remove pixelbox canvas
domUtils.removeDom($screen.canvas, document.body);

BufferData.initializeDatabase(window.assets.buffers);

//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
require('./core/AudioConnector');
require('./core/EventConnector');
var ProceduralBuffer = require('./data/ProceduralBuffer');
require('./ui/bufferLibrary').add(new ProceduralBuffer('whiteNoise', { loop: true, start: 0, end: 0.5 }));
require('./ui/menuHeader');
require('./ui/audioEditor').setBuffer(window.assets.buffers['damu drums1']);

//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
// TODO: automaticaly require modules from walker
require('./modules/TestModule');
require('./modules/Oscillator');
require('./modules/LFO');
require('./modules/Gain');
require('./modules/Panner');
require('./modules/ModPanner');
require('./modules/RingModulator');
require('./modules/Sampler');
require('./modules/Filter');
require('./modules/Delay');
require('./modules/Volume');
require('./modules/Context');

//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
// drag & drop patch files

document.body.addEventListener('dragover', function handleDragOver(e) {
	e.stopPropagation();
	e.preventDefault();
	e.dataTransfer.dropEffect = 'copy';
}, false);

document.body.addEventListener('drop', function (e) {
	e.stopPropagation();
	e.preventDefault();
	var files = e.dataTransfer.files;
	var file  = files[0];

	var reader = new FileReader();
	reader.onload = function (e) {
		var contents = e.target.result;
		try {
			var data = JSON.parse(contents);
			if (data._type && data._type === 'modularPatch') {
				window.moduleManager.setPatch(data);
			}
		} catch (error) {
			console.error(error);
		}
	};
	reader.readAsText(file);
}, false);
