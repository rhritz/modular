/**
 * Main file used only for MODULAR tool ui
 * This file is not used for builing the MODULAR stand-alone library
 */

// core & modules

// require('./modules');
import './modules/index.js';
// require('./data/dataTypes').initializeDatabase(window.assets.buffers);

import {initializeAudioSystem, audioLibrary} from './loaders/initialization.js';
await initializeAudioSystem();
// window.assets.buffers = await initializeAudioSystem();

import { initializeDatabase } from './data/dataTypes.js';
initializeDatabase(audioLibrary); /* window.assets.buffers */

// UI
import * as moduleGUI from './ui/moduleGUI.js';
import * as connectorGUI from './ui/connectorGUI.js';
import * as cableGUI from './ui/cableGUI.js';
import * as knobGUI from './ui/knobGUI.js';
import * as buttonGUI from './ui/buttonGUI.js';

import * as menuHeader from './ui/menuHeader.js'; // require all panels
import * as moduleManager from './ui/moduleManager.js';
import * as dropFile from './ui/dropFile.js';
import * as onWindowResize from './ui/onWindowResize.js';

// register synthesizer editors
import * as synthEditor from './ui/synthEditor/index.js';
import * as discoEditor from './synthesizers/disco/editor.js';
import * as hatsEditor from './synthesizers/hats/editor.js';
synthEditor.register('disco', discoEditor);
synthEditor.register('hats',  hatsEditor);

// import * as modular from './modular.js';
