require('./core/audioContext');
require('./data/BufferData').initializeDatabase(window.assets.buffers);
require('./core/AudioConnector');
require('./core/EventConnector');
require('./core/ParamConnector');

//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
require('./ui/menuHeader');
var ProceduralBuffer = require('./data/ProceduralBuffer');
require('./ui/bufferLibrary').add(new ProceduralBuffer('whiteNoise', { loop: true, start: 0, end: 0.5 })); // TODO
// require('./ui/audioLibrary');

//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
// TODO: automaticaly require modules from walker
require('./modules/TestModule');
require('./modules/Bang');
require('./modules/Oscillator');
require('./modules/LFO');
require('./modules/Envelope');
require('./modules/Fade');
require('./modules/Amp');
require('./modules/Gain');
require('./modules/Panner');
require('./modules/ModPanner');
require('./modules/Sampler');
require('./modules/Filter');
require('./modules/Convolver');
require('./modules/Delay');
require('./modules/ModDelay');
require('./modules/Volume');
require('./modules/Context');


require('./ui/dropFile');