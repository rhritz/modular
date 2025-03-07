// enhanced-browser-audio-loader.js
// Handles both audio files and their associated metadata JSON files

/**
 * Class to manage audio assets in the browser
 */
class AudioManager {
  constructor() {
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.buffers = {};
  }

  /**
   * Load audio file and create a buffer
   * @param {string} id - Identifier for the buffer
   * @param {string} url - URL to the audio file
   * @param {Object} metadata - Optional metadata for the buffer
   * @returns {Promise<Object>} - Promise resolving to a buffer object
   */
  async loadAudioFile(id, url, metadata = {}) {
    try {
      // Create basic buffer data structure
      let bufferData = {
        _type: 'BufferData',
        id: id,
        uri: url,
        ...metadata
      };
      
      // Fetch and decode the audio file
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
      
      // Create the final buffer object with audio data
      bufferData.buffer = audioBuffer;
      this.buffers[id] = bufferData;
      
      return bufferData;
    } catch (error) {
      console.error(`Error loading audio file ${id}:`, error);
      throw error;
    }
  }

  /**
   * Load metadata JSON file for an audio file
   * @param {string} url - URL to the metadata JSON file
   * @returns {Promise<Object>} - Promise resolving to the metadata object
   */
  async loadMetadataFile(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error loading metadata file ${url}:`, error);
      throw error;
    }
  }

  /**
   * Initialize audio library from a manifest that includes metadata
   * @param {Object} manifest - Object containing audio file paths and their associated metadata
   * @returns {Promise<Object>} - Promise resolving to an object of all loaded buffers
   */
  async initializeFromManifest(manifest) {
    const loadPromises = [];
    
    for (const [id, fileInfo] of Object.entries(manifest.audio)) {
      // Handle both simple string URLs and objects with metadataUrl
      let audioUrl, metadataUrl;
      
      if (typeof fileInfo === 'string') {
        audioUrl = fileInfo;
        // Automatically look for a metadata file with the same base name
        metadataUrl = fileInfo.replace(/\.[^/.]+$/, '.json');
      } else {
        audioUrl = fileInfo.url;
        metadataUrl = fileInfo.metadataUrl;
      }
      
      // Create a loading promise for this audio file
      const loadPromise = (async () => {
        let metadata = {};
        
        // Try to load metadata if available
        try {
          if (metadataUrl) {
            metadata = await this.loadMetadataFile(metadataUrl);
          }
        } catch (error) {
          console.warn(`Couldn't load metadata for ${id}, continuing with default properties`);
        }
        
        // Now load the audio with the metadata
        return await this.loadAudioFile(id, audioUrl, metadata);
      })();
      
      loadPromises.push(loadPromise);
    }
    
    await Promise.all(loadPromises);
    return this.buffers;
  }

  /**
   * Load a buffer from a BufferData object (useful for loading from localStorage)
   * @param {Object} bufferData - BufferData object including uri
   * @returns {Promise<Object>} - Promise resolving to the loaded buffer
   */
  async loadBufferFromData(bufferData) {
    if (!bufferData || !bufferData.uri) {
      throw new Error('Invalid buffer data');
    }
    
    // Extract ID from the buffer data or from the URI
    const id = bufferData.id || bufferData.uri.split('/').pop().split('.')[0];
    
    // Load the audio file with the existing metadata
    return await this.loadAudioFile(id, bufferData.uri, bufferData);
  }

  /**
   * Save buffer properties to localStorage
   * @param {Object} params - Parameters containing bufferData
   * @returns {Promise<void>}
   */
  saveProperties(params) {
    const { bufferData } = params;
    const id = bufferData.id;
    
    // Don't store the actual AudioBuffer in localStorage
    const bufferDataForStorage = { ...bufferData };
    delete bufferDataForStorage.buffer;
    
    try {
      localStorage.setItem(`audio_${id}`, JSON.stringify(bufferDataForStorage));
      return Promise.resolve();
    } catch (error) {
      console.error('Error saving audio properties:', error);
      return Promise.reject(error);
    }
  }

  /**
   * Load buffer properties from localStorage
   * @param {string} id - Buffer ID
   * @returns {Object|null} - The buffer data or null if not found
   */
  loadProperties(id) {
    try {
      const data = localStorage.getItem(`audio_${id}`);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(`Error loading properties for ${id}:`, error);
      return null;
    }
  }

  /**
   * Get a buffer by ID
   * @param {string} id - Buffer ID
   * @returns {Object|null} - The buffer or null if not found
   */
  getBuffer(id) {
    return this.buffers[id] || null;
  }

  /**
   * Get all loaded buffers
   * @returns {Object} - Object containing all buffers
   */
  getAllBuffers() {
    return this.buffers;
  }
}

// Create and export a singleton instance
const audioManager = new AudioManager();
export default audioManager;

// For backward compatibility with your original API
export const saveProperties = (params) => audioManager.saveProperties(params);
export const loadProperties = (id) => audioManager.loadProperties(id);
