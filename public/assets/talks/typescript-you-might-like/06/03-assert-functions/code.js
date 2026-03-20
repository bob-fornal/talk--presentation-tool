// Better than throwing in conditionals
function assertIsDefined<T>(
  value: T,
  message?: string
): asserts value is NonNullable<T> {
  if (value === undefined || value === null) {
    throw new Error(message ?? 'Value is null or undefined');
  }
}

function processUser(user: User | null) {
  assertIsDefined(user, 'User must be defined');
  // TypeScript now knows user is NOT null
  console.log(user.name);  // ✅ No optional chaining needed
}
