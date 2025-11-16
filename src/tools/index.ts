/**
 * Tools index file
 * Exports all tool definitions and implementations
 */

import { help } from './help.js';
import { getSwaggerDefinition } from './getSwaggerDefinition.js';
import { listEndpoints } from './listEndpoints.js';
import { listEndpointModels } from './listEndpointModels.js';
import { generateModelCode } from './generateModelCode.js';
import { generateEndpointToolCode } from './generateEndpointToolCode.js';

// Tool definitions array
export const toolDefinitions = [
  help,
  getSwaggerDefinition,
  listEndpoints,
  listEndpointModels,
  generateModelCode,
  generateEndpointToolCode
];

// Export all tool handlers
export { handleHelp } from './help.js';
export { handleGetSwaggerDefinition } from './getSwaggerDefinition.js';
export { handleListEndpoints } from './listEndpoints.js';
export { handleListEndpointModels } from './listEndpointModels.js';
export { handleGenerateModelCode } from './generateModelCode.js';
export { handleGenerateEndpointToolCode } from './generateEndpointToolCode.js';
