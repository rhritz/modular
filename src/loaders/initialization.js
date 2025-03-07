// main.js - Example of initializing the audio system
import audioManager from './EnhancedAudioLoader.js';
import audioManifest from './AudioManifest.js';
import bufferLibrary from '../ui/bufferLibrary.js';

export var audioLibrary = {};

/**
 * Initialize the audio system
 * @returns {Promise<void>}
 */
async function initializeAudioSystem() {
  try {
    // Show loading indicator if you want
    const loadingElement = document.getElementById('loading-indicator');
    if (loadingElement) loadingElement.style.display = 'block';
    
    console.log('Loading audio files...');
    
    // Initialize all audio files from the manifest
    const buffers = await audioManager.initializeFromManifest(audioManifest);
    
    console.log(`Loaded ${Object.keys(buffers).length} audio files`);
    
    // Example of accessing a specific buffer's properties
	/*
    const angelusBuffer = audioManager.getBuffer('angelus');
    if (angelusBuffer) {
      console.log('Angelus buffer loaded with properties:', {
        id: angelusBuffer.id,
        duration: angelusBuffer.buffer.duration,
        loop: angelusBuffer.loop,
        start: angelusBuffer.start,
        end: angelusBuffer.end,
        tags: angelusBuffer.tag
      });
    }
	*/
    
    // Hide loading indicator
    if (loadingElement) loadingElement.style.display = 'none';
    
    // Now your audio system is ready to use with all the buffer metadata
	audioLibrary = buffers;
	console.log('AudioLibrary loadded');
	bufferLibrary.createEntries();
    return buffers;
  } catch (error) {
    console.error('Failed to initialize audio system:', error);
    // Show error message to user
    const errorElement = document.getElementById('error-message');
    if (errorElement) {
      errorElement.textContent = 'Failed to load audio files. Please check your connection and refresh.';
      errorElement.style.display = 'block';
    }
    throw error;
  }
}

// Example of how to initialize when the document is ready
document.addEventListener('DOMContentLoaded', () => {
  initializeAudioSystem()
    .then(buffers => {
      console.log('Audio system ready!');
      // You can now use the buffers to create your audio modules
    })
    .catch(error => {
      console.error('Audio initialization error:', error);
    });
});

// Export for use in other modules
export { initializeAudioSystem };
