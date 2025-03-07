// var modules  = require('../core/modules');
import { add } from '../core/modules.js';
// var CATEGORY = require('../core/moduleCategories');
import * as CATEGORY from '../core/moduleCategories.js';

import Buffer from '../core/Buffer2.js';
import BufferTrim from './BufferTrim.js';
import BufferSlice from './BufferSlice.js';
import TestModule from './TestModule.js';
import EventPool from './EventPool.js';
import EventDelay from './EventDelay.js';
import PlaybackRate from './PlaybackRate.js';

// Register all modules -> TODO tu by som mohol volat initialize?
add(Buffer, CATEGORY.DATA);
add(BufferTrim, CATEGORY.DATA);
add(BufferSlice, CATEGORY.DATA);
add(TestModule, CATEGORY.DATA);
add(EventPool, CATEGORY.DATA);
add(EventDelay, CATEGORY.DATA);
add(PlaybackRate, CATEGORY.DATA);

// event
import Bang from './Bang.js';
import AutoBang from './AutoBang.js';
import RandomBang from './RandomBang.js';
import DateBang from './DateBang.js';
import OnLoadBang from './OnLoadBang.js';

add(Bang, CATEGORY.CONTROL);
add(AutoBang, CATEGORY.CONTROL);
add(RandomBang, CATEGORY.CONTROL);
add(DateBang, CATEGORY.CONTROL);
add(OnLoadBang, CATEGORY.CONTROL);

// MIDI
// modules.add(require('./MidiIn'),         CATEGORY.CONTROL);
// modules.add(require('./NoteOnFilter'),   CATEGORY.CONTROL);
// modules.add(require('./ControlChange'),  CATEGORY.CONTROL);
// modules.add(require('./NoteDetect'),     CATEGORY.CONTROL);

// Oscillator, LFO
import Oscillator from './Oscillator.js';
import LFO from './LFO.js';
import SlowLFO from './SlowLFO.js';

add(Oscillator, CATEGORY.OSC);
add(LFO, CATEGORY.OSC);
add(SlowLFO, CATEGORY.OSC);

// envelope
import Envelope from './Envelope.js';
import Fade from './Fade.js';

add(Envelope, CATEGORY.ENVELOPE);
add(Fade, CATEGORY.ENVELOPE);

// amp, pan
// modules.add(require('./Volume'),         CATEGORY.GAIN);
// modules.add(require('./Amp'),            CATEGORY.GAIN);
// modules.add(require('./AutoXFade'),      CATEGORY.GAIN);
// modules.add(require('./Gain'),           CATEGORY.GAIN);
// modules.add(require('./Panner'),         CATEGORY.GAIN);
// modules.add(require('./ModPanner'),      CATEGORY.GAIN);

import Volume from './Volume.js';
import Amp from './Amp.js';
import AutoXFade from './AutoXFade.js';
import Gain from './Gain.js';
import Panner from './Panner.js';
import ModPanner from './ModPanner.js';

add(Volume, CATEGORY.GAIN);
add(Amp, CATEGORY.GAIN);
add(AutoXFade, CATEGORY.GAIN);
add(Gain, CATEGORY.GAIN);
add(Fade, CATEGORY.GAIN);
add(ModPanner, CATEGORY.GAIN);

// sampler
// modules.add(require('./Sampler'),        CATEGORY.SAMPLER);
// modules.add(require('./OneShotSampler'), CATEGORY.SAMPLER);
// modules.add(require('./XFadeSampler'),   CATEGORY.SAMPLER);

import Sampler from './Sampler.js';
import OneShotSampler from './OneShotSampler.js';
import XFadeSampler from './XFadeSampler.js';

add(Sampler, CATEGORY.SAMPLER);
add(OneShotSampler, CATEGORY.SAMPLER);
add(XFadeSampler, CATEGORY.SAMPLER);

// filter
// modules.add(require('./Filter'),         CATEGORY.FILTER);
// modules.add(require('./FilterMod'),      CATEGORY.FILTER);

import Filter from './Filter.js';
import FilterMod from './FilterMod.js';

add(Filter, CATEGORY.FILTER);
add(FilterMod, CATEGORY.FILTER);

// reverb, delay, fx
// modules.add(require('./Convolver'),      CATEGORY.EFFECT);
// modules.add(require('./Delay'),          CATEGORY.EFFECT);
// modules.add(require('./ModDelay'),       CATEGORY.EFFECT);

import Convolver from './Convolver.js';
import Delay from './Delay.js';
import ModDelay from './ModDelay.js';

add(Convolver, CATEGORY.EFFECT);
add(Delay, CATEGORY.EFFECT);
add(ModDelay, CATEGORY.EFFECT);

// out
// modules.add(require('./Context'),        CATEGORY.IN_OUT);

import Context from './Context.js';

add(Context, CATEGORY.IN_OUT);
