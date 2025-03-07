import SynthEditorPanel from './SynthEditorPanel.js';

var editorBuilders = {};

export function register(synthId, editorBuilder) {
	editorBuilders[synthId] = editorBuilder;
};

export function hasEditor(synthId) {
	return !!editorBuilders[synthId];
};

export function open(synthId, bufferData) {
	synthEditorPanel.init(synthId, bufferData);
	var editorBuilder = editorBuilders[synthId];
	if (!editorBuilder) return console.error('there is no editor for synth "' + synthId + '"');
	editorBuilder.create(synthEditorPanel, bufferData.params);
	// TODO: bind editor header menu with bufferData
	// - open audio editor
	// - play
	// - generate
	// - loop property
	// - tags ?
	// - save ?

	synthEditorPanel.open();
	synthEditorPanel.setOnTop();
};

var synthEditorPanel = new SynthEditorPanel();
export default synthEditorPanel;
