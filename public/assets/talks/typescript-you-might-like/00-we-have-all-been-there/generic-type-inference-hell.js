// Painful code - generic error messages that don't help
function processData<T extends { id: string }>(
  items: T[],
  transformer: <U>(item: T) => U,
  validator: <V>(transformed: U) => V
) {
  // Error: 'U' only refers to a type, but is being used as a value here
  // Wait, what? How do I fix this?
  return items.map(item => validator(transformer(item)));
}

// Usage that produces cryptic errors
const result = processData(
  [{ id: '1', name: 'test' }],
  item => ({ ...item, processed: true }),
  transformed => transformed.name.toUpperCase()
);