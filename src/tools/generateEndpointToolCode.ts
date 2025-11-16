/**
 * generateEndpointToolCode tool
 * Generates TypeScript code for an MCP tool definition based on a Swagger endpoint
 */

import swaggerService from "../services/index.js";

// Tool definition
export const generateEndpointToolCode = {
  name: "generateEndpointToolCode",
  description: "Generates TypeScript code for an MCP tool definition based on a Swagger endpoint.",
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
      },
      includeApiInName: {
        type: "boolean",
        description: "Whether to include 'api' segments in the generated tool name (default: false)"
      },
      includeVersionInName: {
        type: "boolean",
        description: "Whether to include version segments (e.g., 'v3') in the generated tool name (default: false)"
      },
      singularizeResourceNames: {
        type: "boolean",
        description: "Whether to singularize resource names in the generated tool name (default: true)"
      }
    },
    required: ["path", "method", "swaggerFilePath"]
  }
};

// Tool handler
export async function handleGenerateEndpointToolCode(input: any) {
  const tsCode = await swaggerService.generateEndpointToolCode(input);
  
  return {
    content: [{
      type: "text",
      text: tsCode
    }]
  };
} 
