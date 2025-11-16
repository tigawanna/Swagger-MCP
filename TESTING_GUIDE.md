# Swagger-MCP Testing Guide

Quick guide for testing the improved Swagger-MCP server.

---

## 🚀 Quick Start

### 1. Build the Project
```bash
cd /home/dennis/Desktop/code/mcp/Swagger-MCP
pnpm run build
```

### 2. Test with MCP Inspector
```bash
pnpm run inspector
```

This will:
- Build the project
- Start the MCP server
- Launch the inspector UI in your browser
- Display URL: `http://localhost:6274/?MCP_PROXY_AUTH_TOKEN=...`

---

## 🧪 Testing Tools in Inspector

### Tool 1: help
```json
{
  "name": "help",
  "arguments": {}
}
```
**Expected:** Returns detailed help text about all tools

### Tool 2: getSwaggerDefinition
```json
{
  "name": "getSwaggerDefinition",
  "arguments": {
    "url": "https://petstore3.swagger.io/api/v3/openapi.json",
    "saveLocation": "/home/dennis/Desktop/code/mcp/Swagger-MCP"
  }
}
```
**Expected:** Downloads and saves the Swagger file, returns filepath

### Tool 3: listEndpoints
```json
{
  "name": "listEndpoints",
  "arguments": {
    "swaggerFilePath": "/home/dennis/Desktop/code/mcp/Swagger-MCP/[hash].json"
  }
}
```
**Expected:** Lists all API endpoints with methods and descriptions

### Tool 4: listEndpointModels
```json
{
  "name": "listEndpointModels",
  "arguments": {
    "path": "/pet",
    "method": "POST",
    "swaggerFilePath": "/home/dennis/Desktop/code/mcp/Swagger-MCP/[hash].json"
  }
}
```
**Expected:** Lists all models used by the endpoint

### Tool 5: generateModelCode
```json
{
  "name": "generateModelCode",
  "arguments": {
    "modelName": "Pet",
    "swaggerFilePath": "/home/dennis/Desktop/code/mcp/Swagger-MCP/[hash].json"
  }
}
```
**Expected:** Generates TypeScript interface code

### Tool 6: generateEndpointToolCode
```json
{
  "name": "generateEndpointToolCode",
  "arguments": {
    "path": "/pet",
    "method": "POST",
    "swaggerFilePath": "/home/dennis/Desktop/code/mcp/Swagger-MCP/[hash].json"
  }
}
```
**Expected:** Generates MCP tool definition code

---

## 🔍 What to Check

### In MCP Inspector:

1. **Tools List**
   - ✅ All 6 tools should appear
   - ✅ Each has proper name and description
   - ✅ Input schemas are valid JSON Schema

2. **Console Output**
   - ✅ Should see: `Swagger MCP server running on stdio`
   - ✅ Tool calls logged: `[Swagger-MCP] Tool call: toolName`
   - ✅ Arguments logged (when provided)

3. **Error Handling**
   - Test with invalid parameters
   - Test with missing swagger file
   - ✅ Errors should be properly formatted
   - ✅ Error codes should be MCP standard

4. **Response Format**
   - ✅ All responses have: `{ content: [{ type: "text", text: "..." }] }`
   - ✅ No raw strings or incorrect formats

---

## 🐛 Testing Error Scenarios

### Invalid Parameters
```json
{
  "name": "listEndpoints",
  "arguments": {}
}
```
**Expected:** McpError with InvalidParams code

### Missing File
```json
{
  "name": "listEndpoints",
  "arguments": {
    "swaggerFilePath": "/nonexistent/file.json"
  }
}
```
**Expected:** McpError with InternalError and clear message

### Unknown Tool
```json
{
  "name": "nonexistentTool",
  "arguments": {}
}
```
**Expected:** McpError with MethodNotFound code

---

## 🖥️ CLI Testing

### Direct Execution
```bash
# Make sure it's executable
chmod +x build/index.js

# Run directly
./build/index.js
```
**Expected:** Server starts, logs to stderr

### Signal Handling
```bash
node build/index.js
# Press Ctrl+C
```
**Expected:** 
- Logs: "Shutting down Swagger MCP server..."
- Clean exit
- No hanging processes

---

## 📊 Validation Checklist

### Build & Startup
- [ ] `pnpm run build` completes without errors
- [ ] `pnpm run inspector` starts successfully
- [ ] Server logs: "Swagger MCP server running on stdio"
- [ ] Inspector opens in browser

### Tool Discovery
- [ ] All 6 tools visible in inspector
- [ ] Tool schemas are valid
- [ ] Descriptions are clear

### Tool Execution
- [ ] `help` tool works
- [ ] `getSwaggerDefinition` downloads and saves file
- [ ] `listEndpoints` returns endpoint list
- [ ] `listEndpointModels` returns model list
- [ ] `generateModelCode` generates TypeScript
- [ ] `generateEndpointToolCode` generates tool code

### Error Handling
- [ ] Invalid parameters throw McpError
- [ ] Missing files throw McpError with clear message
- [ ] Unknown tools throw MethodNotFound
- [ ] Error messages are readable

### Debugging
- [ ] console.error messages visible in inspector
- [ ] Tool calls are logged
- [ ] Errors are logged with details

### Lifecycle
- [ ] Server starts cleanly
- [ ] Ctrl+C triggers shutdown message
- [ ] Server exits cleanly
- [ ] No zombie processes

---

## 🔧 Common Issues

### Issue: Inspector won't start
**Solution:** Check if port 6274 is already in use
```bash
lsof -i :6274
# Kill any existing process if needed
```

### Issue: Swagger file not found
**Solution:** Use absolute paths, not relative paths
```bash
# Wrong: "./swagger.json"
# Right: "/home/dennis/Desktop/code/mcp/Swagger-MCP/swagger.json"
```

### Issue: Tools not appearing
**Solution:** Rebuild the project
```bash
pnpm run build
```

---

## 📈 Performance Testing

### Large Swagger Files
Test with complex APIs:
- Kubernetes API
- AWS API
- GitHub API

### Many Endpoints
Check performance with 100+ endpoints

### Complex Models
Test deeply nested model generation

---

## 🎯 Success Criteria

Your Swagger-MCP implementation is ready when:

1. ✅ All 6 tools work in inspector
2. ✅ Errors are properly formatted as McpError
3. ✅ console.error messages visible in inspector
4. ✅ Clean startup and shutdown
5. ✅ No winston logs in output
6. ✅ Response format matches MCP spec
7. ✅ Works with real Swagger files
8. ✅ Can be used in Claude Desktop/Cline

---

## 🚀 Next: Use in Real MCP Clients

### Claude Desktop Configuration
Add to `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "swagger-mcp": {
      "command": "node",
      "args": ["/home/dennis/Desktop/code/mcp/Swagger-MCP/build/index.js"]
    }
  }
}
```

### Cline/Cursor Configuration
Add to MCP settings with the same command and args.

---

**Happy Testing! 🎉**
