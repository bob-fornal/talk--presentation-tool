// Option 1: Type annotation loses specificity
const config1: Record<string, string> = {
  endpoint: 'https://api.example.com'
};
config1['endpoint'].toUpperCase();  // Works, but...
const url = new URL(config1['endpoint']);  // Generic string, no URL specifics

// Option 2: No annotation loses safety
const config2 = {
  endpoint: 'https://api.example.com'
};
config2.endpont;  // ❌ Typo allowed!

type Config3 = {
  endpoint: string;
  timeout: number;
};

const config3 = {
  endpoint: 'https://api.example.com',
  timeout: 5000,
} satisfies Config3;

config3.endpoint.toUpperCase();  // ✅ Knows it's a string
config3.timeout.toFixed();       // ✅ Knows it's a number
config3.endpont;                 // ❌ Typo caught!

type RouteConfig = Record<string, { path: string; component: string }>;

const routes = {
  home: { path: '/', component: 'Home' },
  users: { path: '/users', component: 'UserList' },
  profile: { path: '/profile', component: 'Profile' }
} satisfies RouteConfig;

// Get autocomplete for route names:
const homePath = routes.home.path;  // ✅ Autocomplete knows 'home' exists
const oopsPath = routes.hoem.path;  // ❌ Typo caught!