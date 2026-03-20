const values = ['a', null, 'b', undefined, 'c', null];

// ❌ TypeScript doesn't narrow the type
const filtered = values.filter(x => x != null);
// filtered is still (string | null | undefined)[]

// ✅ Use type predicate
function isNotNull<T>(value: T | null | undefined): value is T {
  return value != null;
}

const filtered = values.filter(isNotNull);
// filtered is now string[] ✅
