// 1. Enable TypeScript, but allow JS

// tsconfig.json
{
  "compilerOptions": {
    "allowJs": true,
    "checkJs": false,  // Don't check JS files yet
    "strict": false    // Start loose
  }
}

// 2. Convert one file at a time (.js → .ts)
// 3. Gradually enable strict flags
{
  "strict": true,  // or enable individually:
  "strictNullChecks": true,
  "strictFunctionTypes": true
}