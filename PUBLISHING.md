# Publishing to npm

This guide walks you through publishing the Swagger MCP package to npm.

## Prerequisites

1. **npm Account**: Create an account at https://www.npmjs.com
2. **npm CLI**: Ensure npm is installed (comes with Node.js)
3. **Authentication**: Log in to npm from your terminal

## Step-by-Step Publishing Process

### 1. Login to npm

```bash
npm login
```

You'll be prompted for:
- Username
- Password
- Email
- One-time password (if 2FA is enabled)

### 2. Verify Your Login

```bash
npm whoami
```

This should display your npm username.

### 3. Check Package Name Availability

```bash
npm search @tigawanna/swagger-mcp
```

The package is using a scoped name `@tigawanna/swagger-mcp` which means it's under your npm namespace. This requires that you have an npm account with username `tigawanna` or are part of an npm organization with that name.

### 4. Clean and Build

```bash
# Clean previous builds
rm -rf build/

# Install dependencies
npm install

# Build the project
npm run build
```

### 5. Test the Package Locally

```bash
# Simulate what will be published
npm pack

# This creates a .tgz file you can inspect
# Test it locally:
npm install -g ./tigawanna-swagger-mcp-1.0.0.tgz

# Test running it
swagger-mcp --help
```

### 6. Version Management

For your first publish, version 1.0.0 is fine. For future updates:

```bash
# Patch release (1.0.0 -> 1.0.1) - bug fixes
npm version patch

# Minor release (1.0.0 -> 1.1.0) - new features, backward compatible
npm version minor

# Major release (1.0.0 -> 2.0.0) - breaking changes
npm version major
```

### 7. Publish to npm

```bash
# For public package (free)
npm publish --access public

# For scoped private package (requires paid plan)
npm publish --access restricted
```

### 8. Verify Publication

After publishing, check:
- Package page: https://www.npmjs.com/package/@tigawanna/swagger-mcp
- Try installing: `npx @tigawanna/swagger-mcp@latest`

## Using the Published Package

Users can now use your package via npx without installation:

```bash
npx @tigawanna/swagger-mcp
```

Or install it globally:

```bash
npm install -g @tigawanna/swagger-mcp
```

Or as a project dependency:

```bash
npm install @tigawanna/swagger-mcp
```

## Updating the Package

When you make changes:

1. **Make your code changes**
2. **Update version**: `npm version patch` (or minor/major)
3. **Build**: `npm run build`
4. **Test**: `npm pack` and test locally
5. **Publish**: `npm publish`

## Important Notes

### What Gets Published

Only these files/folders are included (defined in `package.json` "files"):
- `build/` - Compiled JavaScript
- `README.md` - Documentation
- `LICENSE` - License file
- `PROMPTS.md` - MCP prompts documentation
- `package.json` - Package metadata

### What's Excluded (via .npmignore)

- Source TypeScript files (`src/`)
- Tests (`tests/`)
- Environment files (`.env`)
- Development configs
- Git files

## Troubleshooting

### Error: "You must verify your email"
- Check your npm account email and verify it

### Error: "You do not have permission to publish"
- Make sure you're logged in as `tigawanna`
- Verify your npm username matches: `npm whoami`
- For scoped packages, you must own the scope

### Error: "Package name too similar to existing package"
- This shouldn't happen with scoped packages like `@tigawanna/swagger-mcp`
- Scoped packages are namespaced to your account

### Error: "npm ERR! 402 Payment Required"
- You're trying to publish a private scoped package
- Either make it public or upgrade to a paid npm plan

## Security Best Practices

1. **Enable 2FA**: Protect your npm account
   ```bash
   npm profile enable-2fa auth-and-writes
   ```

2. **Use npm automation tokens** for CI/CD instead of passwords

3. **Review package contents** before publishing:
   ```bash
   npm pack --dry-run
   ```

## CI/CD Publishing (Optional)

To automate publishing via GitHub Actions, create `.github/workflows/publish.yml`:

```yaml
name: Publish to npm

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      - run: npm install
      - run: npm run build
      - run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

Add your npm token to GitHub repository secrets as `NPM_TOKEN`.

## Support

If you encounter issues, check:
- npm documentation: https://docs.npmjs.com/
- npm status: https://status.npmjs.org/
