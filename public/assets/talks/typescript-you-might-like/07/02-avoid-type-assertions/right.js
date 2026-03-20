// Validate instead of asserting
function isUser(data: unknown): data is User {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'email' in data
  );
}

if (isUser(apiResponse)) {
  console.log(apiResponse.email);  // ✅ Safe
}
