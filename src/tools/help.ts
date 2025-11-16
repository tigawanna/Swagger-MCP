/**
 * help tool
 * Provides information about all available tools
 */

// Tool definition
export const help = {
  name: "help",
  description: "Displays information about all available Swagger MCP tools and their usage. Use this to understand what tools are available and how to use them.",
  inputSchema: {
    type: "object",
    properties: {},
    required: []
  }
};

// Tool handler
export async function handleHelp(input: any) {
  const helpText = `
# Swagger MCP Server - Available Tools

This MCP server provides tools for working with Swagger/OpenAPI specifications.

## Available Tools:

### 1. help
**Description:** Displays this help information about all available tools.
**Parameters:** None
**Usage:** Call this tool anytime you need information about available tools.

---

### 2. getSwaggerDefinition
**Description:** Fetches a Swagger/OpenAPI definition from a URL and saves it locally.
**Parameters:**
- \`url\` (required): The URL of the Swagger definition
- \`saveLocation\` (required): The location where to save the file (usually the project root)

**Important:** After calling this tool, you MUST create a \`.swagger-mcp\` configuration file in the root of the solution with:
\`\`\`
SWAGGER_FILEPATH=TheFullFilePath
\`\`\`

---

### 3. listEndpoints
**Description:** Lists all endpoints from the Swagger definition with their HTTP methods and descriptions.
**Parameters:** None (requires \`.swagger-mcp\` configuration file)
**Usage:** Use this to see all available API endpoints in the Swagger specification.

---

### 4. listEndpointModels
**Description:** Lists all models (schemas) used by a specific endpoint.
**Parameters:**
- \`path\` (required): The endpoint path (e.g., "/pets/{id}")
- \`method\` (required): The HTTP method (GET, POST, PUT, DELETE, etc.)

**Usage:** Use this to see what data models are required for a specific API endpoint.

---

### 5. generateModelCode
**Description:** Generates TypeScript code for a specific model/schema from the Swagger definition.
**Parameters:**
- \`modelName\` (required): The name of the model to generate code for

**Usage:** Use this to generate TypeScript interfaces or types for API models.

---

### 6. generateEndpointToolCode
**Description:** Generates complete MCP tool definition code for a specific endpoint.
**Parameters:**
- \`path\` (required): The endpoint path (e.g., "/pets")
- \`method\` (required): The HTTP method (GET, POST, PUT, DELETE, etc.)
- \`singularizeResourceNames\` (optional): Whether to use singular names for resources

**Usage:** Use this to generate MCP tool definitions that can be used to interact with API endpoints.

---

## Workflow:

1. **Start with getSwaggerDefinition**: Download the Swagger spec from a URL
2. **Create .swagger-mcp file**: Store the file path in the configuration file
3. **Use listEndpoints**: See what endpoints are available
4. **Use listEndpointModels**: Check what models an endpoint uses
5. **Use generateModelCode**: Generate TypeScript code for models
6. **Use generateEndpointToolCode**: Generate MCP tool definitions for endpoints

---

## Configuration:

All tools (except getSwaggerDefinition) require a \`.swagger-mcp\` file in the project root:
\`\`\`
SWAGGER_FILEPATH=/path/to/swagger-file.json
\`\`\`

For more information, visit: https://github.com/tigawanna/swagger-mcp
`;

  return {
    content: [{
      type: "text",
      text: helpText
    }]
  };
}
