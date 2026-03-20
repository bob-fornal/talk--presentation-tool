// Option 1: Type annotation loses specificity
const config: Record<string, string> = {
  endpoint: 'https://api.example.com'
};
config.endpoint.toUpperCase();  // Works, but...
const url = new URL(config.endpoint);  // Generic string, no URL specifics

// Option 2: No annotation loses safety
const config = {
  endpoint: 'https://api.example.com'
};
config.endpont;  // ❌ Typo allowed!
