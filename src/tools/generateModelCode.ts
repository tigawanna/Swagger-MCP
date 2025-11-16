/**
 * generateModelCode tool
 * Generates TypeScript code for a model from the Swagger definition
 */

import swaggerService from "../services/index.js";

// Tool definition
export const generateModelCode = {
  name: "generateModelCode",
  description: "Generates TypeScript code for a model from the Swagger definition.",
  inputSchema: {
    type: "object",
    properties: {
      modelName: {
        type: "string",
        description: "The name of the model to generate code for"
      },
      swaggerFilePath: {
        type: "string",
        description: "Path to the Swagger file. This should be the full file path that was saved in the .swagger-mcp file after calling getSwaggerDefinition. You can find this path in the .swagger-mcp file in the solution root with the format SWAGGER_FILEPATH=path/to/file.json."
      }
    },
    required: ["modelName", "swaggerFilePath"]
  }
};

// Tool handler
export async function handleGenerateModelCode(input: any) {
  const tsCode = await swaggerService.generateModelCode(input);
  
  return {
    content: [{
      type: "text",
      text: tsCode
    }]
  };
} 
