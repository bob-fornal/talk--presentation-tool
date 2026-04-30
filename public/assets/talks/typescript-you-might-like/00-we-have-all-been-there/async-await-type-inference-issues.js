// Painful code - vague promise-related errors
async function fetchUserData(id: string) {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}

async function processUser(id: string) {
  const user = fetchUserData(id); // Forgot await!
  
  // Error: Property 'name' does not exist on type 'Promise<any>'
  // The error doesn't say "Did you forget await?"
  console.log(user.name);
  
  // Later in the code...
  // Error: This expression is not callable.
  // Type 'Promise<any>' has no call signatures.
  user.toString();
}