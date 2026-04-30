// Clear contract between caller and function
function formatUser(user: { name: string; age: number }): string {
  return `${user.name} (${user.age})`;
}

// API responses
interface ApiResponse {
  data: User[];
  error?: string;
}