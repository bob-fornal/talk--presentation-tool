type RouteConfig = Record<string, { path: string; component: string }>;

const routes = {
  home: { path: '/', component: 'Home' },
  users: { path: '/users', component: 'UserList' },
  profile: { path: '/profile', component: 'Profile' }
} satisfies RouteConfig;

// Get autocomplete for route names:
const homePath = routes.home.path;  // ✅ Autocomplete knows 'home' exists
const oopsPath = routes.hoem.path;  // ❌ Typo caught!
