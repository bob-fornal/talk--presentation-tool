// Painful code - error messages are incomprehensible
type ExtractPromiseType<T> = T extends Promise<infer U>
  ? U extends Array<infer V>
    ? V extends { id: infer ID }
      ? ID
      : never
    : never
  : never;

type Result = ExtractPromiseType<Promise<Array<{ id: string; name: string }>>>;

// Trying to use it produces nightmares
function processResult<T>(data: T): ExtractPromiseType<T> {
  // Error: Type 'T' does not satisfy the constraint 'Promise<{ id: unknown; }[]>'
  // Type 'T' is not assignable to type 'Promise<{ id: unknown; }[]>'
  // ... 15 more lines of error message
  return data as any;
}