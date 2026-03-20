type Config = {
  endpoint: string;
  timeout: number;
};

const config = {
  endpoint: 'https://api.example.com',
  timeout: 5000,
  extra: 'allowed'  // Can have extra properties
} satisfies Config;

config.endpoint.toUpperCase();  // ✅ Knows it's a string
config.timeout.toFixed();       // ✅ Knows it's a number
config.endpont;                 // ❌ Typo caught!
