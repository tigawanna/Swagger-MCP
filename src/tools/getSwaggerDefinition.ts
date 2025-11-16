/**
 * getSwaggerDefinition tool
 * Retrieves the Swagger definition
 */

import { text } from "express";
import swaggerService from "../services/index.js";

// Tool definition
export const getSwaggerDefinition = {
  name: "getSwaggerDefinition",
  description: "Fetches a Swagger/OpenAPI definition from a URL and saves it locally. IMPORTANT: After calling this tool, you will receive a response containing a 'filePath' property. You MUST then create a configuration file named `.swagger-mcp` in the root of the solution and write the file path to it in the format `SWAGGER_FILEPATH=TheFullFilePath`. This configuration file is required by all other Swagger-related tools. Note that this tool does NOT create the .swagger-mcp file automatically - you need to create it separately after receiving the response.",
  inputSchema: {
    type: "object",
    properties: {
      // String parameters
      url: {
        type: "string",
        description: "The URL of the Swagger definition"
      },
      saveLocation: {
        type: "string",
        description: "The location where to save the Swagger definition file. This should be the current solution's root folder."
      }
    },
    required: ["url", "saveLocation"]
  }
};

// Tool handler
export async function handleGetSwaggerDefinition(input: any) {
  const swaggerDefinition = await swaggerService.getSwaggerDefinition(input);
  
  return {
    content: [{
      type: "text",
      text: `Successfully downloaded and saved Swagger definition.\n\nFile saved to: ${swaggerDefinition.filePath}\n\nIMPORTANT: You must now create a file named '.swagger-mcp' in the solution root with the following content:\n\nSWAGGER_FILEPATH=${swaggerDefinition.filePath}\n\nThis file is required by all other Swagger-related tools.`
    }]
  };
} 
