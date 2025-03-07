/**
 * Synthesizers can be added at runtime (before a patch requiring it is loaded)
 *
 * a synth is a module that expose a method `generate` taking two parameters:
 *  - a {BufferData} instance, with informations about synth in bufferData.params
 *  - a callback {function} to call once the synth has filled the buffer with audio
 *
 * The synth is responsible for creating the audio buffer, and filling it and set
 * the `start` and `end` properties of the bufferData.
 *
 * Callback should be deffered if the generate function is synchronous, in order
 * to be consistent with Buffer API that needs to load audio.
 */

// var synthEditor = require('../ui/synthEditor');

import * as synthEditor from '../ui/synthEditor/index.js';
import * as noize from './noize/index.js';
import * as hats from './hats/index.js';
import * as disco from './disco/index.js';

export const SYNTHESIZERS = {
	'noize': noize,
	'hats':  hats,
	'disco': disco,
};

export function getSynth(id) {
	return SYNTHESIZERS[id];
};

export function addSynth(id, synth, editor) {
	SYNTHESIZERS[id] = synth;
	if (editor) synthEditor.register(id, editor);
};
