/**
 * listEndpoints tool
 * Lists all endpoints from the Swagger definition
 */

import swaggerService from "../services/index.js";

// Tool definition
export const listEndpoints = {
  name: "listEndpoints",
  description: "Lists all endpoints from the Swagger definition including their HTTP methods and descriptions.",
  inputSchema: {
    type: "object",
    properties: {
      swaggerFilePath: {
        type: "string",
        description: "Path to the Swagger file. This should be the full file path that was saved in the .swagger-mcp file after calling getSwaggerDefinition. You can find this path in the .swagger-mcp file in the solution root with the format SWAGGER_FILEPATH=path/to/file.json."
      }
    },
    required: ["swaggerFilePath"]
  }
};

// Tool handler
export async function handleListEndpoints(input: any) {
  const endpoints = await swaggerService.listEndpoints(input);
  
  return {
    content: [{
      type: "text",
      text: JSON.stringify(endpoints, null, 2)
    }]
  };
} 
