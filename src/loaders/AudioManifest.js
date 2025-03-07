// audio-manifest.js
// This manifest includes audio files and their associated metadata

export default {
  audio: {
    // Simple approach: the loader will automatically look for [filename].json
    'angelus': 'audio/angelus.mp3',
    
    // Or explicitly specify the metadata URL
    'boat': {
      url: 'audio/boat.mp3',
      metadataUrl: 'audio/boat.json'
    },

  }
};
