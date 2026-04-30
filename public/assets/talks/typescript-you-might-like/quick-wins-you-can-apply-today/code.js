// ✅ Literal types for constants
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

// ✅ Readonly for immutability
function process(data: readonly string[]) {}

// ✅ satisfies for safe configuration
const config = { /*...*/ } satisfies ConfigShape;

// ✅ Type predicates for filtering
const clean = items.filter((x): x is string => typeof x === 'string');

// ✅ Exhaustive checks
default: const _: never = value;
