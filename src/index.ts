#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
  McpError
} from "@modelcontextprotocol/sdk/types.js";

import { swaggerErrorMessage } from "./utils/errors.js";

// Import tool definitions and handlers
import { toolDefinitions,
  handleHelp,
  handleGetSwaggerDefinition,
  handleListEndpoints,
  handleListEndpointModels,
  handleGenerateModelCode,
  handleGenerateEndpointToolCode
} from "./tools/index.js";

// Import prompt definitions and handlers
import { promptDefinitions, promptHandlers } from "./prompts/index.js";

// Create MCP server
const server = new Server(
  {
    name: 'Swagger MCP Server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
      prompts: {}
    },
  }
);

// Error handling
server.onerror = (error) => console.error('[MCP Error]', error);

// Signal handling for graceful shutdown
process.on('SIGINT', async () => {
  console.error('Shutting down Swagger MCP server...');
  await server.close();
  process.exit(0);
});

/**
 * Handler that lists available tools.
 * Exposes tools for interacting with Swagger API.
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: toolDefinitions
  };
});

/**
 * Handler that lists available prompts.
 * Exposes prompts for guiding through common workflows.
 */
server.setRequestHandler(ListPromptsRequestSchema, async () => {
  return {
    prompts: promptDefinitions
  };
});

/**
 * Handler for getting a specific prompt.
 * Returns the prompt template with messages.
 */
server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  try {
    const promptName = request.params.name;
    const promptArgs = request.params.arguments || {};
    
    console.error(`[Swagger-MCP] Prompt request: ${promptName}`);
    console.error(`[Swagger-MCP] Arguments:`, JSON.stringify(promptArgs));
    
    const promptHandler = promptHandlers[promptName];
    
    if (!promptHandler) {
      throw new McpError(
        ErrorCode.MethodNotFound,
        `Unknown prompt: ${promptName}`
      );
    }
    
    // Validate arguments against schema
    const validationResult = promptHandler.schema.safeParse(promptArgs);
    if (!validationResult.success) {
      throw new McpError(
        ErrorCode.InvalidParams,
        `Invalid arguments: ${validationResult.error.message}`
      );
    }
    
    // Call the prompt handler
    const result = await promptHandler.handler(promptArgs);
    return result;
  } catch (error: unknown) {
    if (error instanceof McpError) {
      throw error;
    }
    throw new McpError(
      ErrorCode.InternalError,
      `Prompt execution failed: ${swaggerErrorMessage(error)}`
    );
  }
});

/**
 * Handler for tool calls.
 * Processes requests to call Swagger API tools.
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    const name = request.params.name;
    const input = request.params.arguments;
    
    console.error(`[Swagger-MCP] Tool call: ${name}`);
    if (input && Object.keys(input).length > 0) {
      console.error(`[Swagger-MCP] Arguments:`, JSON.stringify(input));
    }
    
    switch (name) {
      case "help":
        return await handleHelp(input);
      
      case "getSwaggerDefinition":
        return await handleGetSwaggerDefinition(input);
      
      case "listEndpoints":
        return await handleListEndpoints(input);
      
      case "listEndpointModels":
        return await handleListEndpointModels(input);
      
      case "generateModelCode":
        return await handleGenerateModelCode(input);
      
      case "generateEndpointToolCode":
        return await handleGenerateEndpointToolCode(input);
      
      default:
        throw new McpError(
          ErrorCode.MethodNotFound,
          `Unknown tool: ${name}`
        );
    }
  } catch (error: unknown) {
    console.error(`[Swagger-MCP] Error in tool ${request.params.name}:`, error);
    if (error instanceof McpError) {
      throw error;
    }
    throw new McpError(
      ErrorCode.InternalError,
      `Tool execution failed: ${swaggerErrorMessage(error)}`
    );
  }
});

/**
 * Start the server using stdio transport.
 * This allows the server to communicate via standard input/output streams.
 */
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Swagger MCP server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error starting server:', error);
  process.exit(1);
});
