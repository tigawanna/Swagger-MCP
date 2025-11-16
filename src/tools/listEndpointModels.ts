/**
 * listEndpointModels tool
 * Lists all models used by a specific endpoint from the Swagger definition
 */

import swaggerService from "../services/index.js";

// Tool definition
export const listEndpointModels = {
  name: "listEndpointModels",
  description: "Lists all models used by a specific endpoint from the Swagger definition.",
  inputSchema: {
    type: "object",
    properties: {
      path: {
        type: "string",
        description: "The path of the endpoint (e.g. /pets)"
      },
      method: {
        type: "string",
        description: "The HTTP method of the endpoint (e.g. GET, POST, PUT, DELETE)"
      },
      swaggerFilePath: {
        type: "string",
        description: "Path to the Swagger file. This should be the full file path that was saved in the .swagger-mcp file after calling getSwaggerDefinition. You can find this path in the .swagger-mcp file in the solution root with the format SWAGGER_FILEPATH=path/to/file.json."
      }
    },
    required: ["path", "method", "swaggerFilePath"]
  }
};

// Tool handler
export async function handleListEndpointModels(input: any) {
  const models = await swaggerService.listEndpointModels(input);
  
  return {
    content: [{
      type: "text",
      text: JSON.stringify(models, null, 2)
    }]
  };
} 
