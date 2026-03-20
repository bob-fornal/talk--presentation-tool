// Define data structure once
const API_ENDPOINTS = {
  users: '/api/users',
  posts: '/api/posts',
  comments: '/api/comments'
} as const;

// Generate types from it
type Endpoint = keyof typeof API_ENDPOINTS;
type EndpointPath = typeof API_ENDPOINTS[Endpoint];

function fetchData(endpoint: Endpoint) {
  return fetch(API_ENDPOINTS[endpoint]);
}

fetchData('users');    // ✅ Autocomplete!
fetchData('userss');   // ❌ Error
