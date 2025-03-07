/** ConnectorFactory
 *
 * @author Cedric Stoquer
 */
const connectors = {
  input: {},
  output: {}
};

export function register(ConnectorClass, way, type) {
  if (!connectors[way]) return;
  connectors[way][type] = ConnectorClass;
}

export function getConnector(way, type) {
  if (!connectors[way]) return undefined;
  return connectors[way][type];
}

// Import connector implementations
import * as AudioConnector from './AudioConnector.js';
import * as EventConnector from './EventConnector.js';
import * as ParamConnector from './ParamConnector.js';

// Initialize all connectors
export function initializeConnectors() {
  // Any initialization code that needs to run after all modules are loaded
  AudioConnector.initializeAudioOutput();
  AudioConnector.initializeAudioInput();
  EventConnector.initializeEventInput();
  EventConnector.initializeEventOutput();
  ParamConnector.initializeParamInput();
  ParamConnector.initializeParamOutput();
}

// Export the connectors object as well
export default connectors;
initializeConnectors();
