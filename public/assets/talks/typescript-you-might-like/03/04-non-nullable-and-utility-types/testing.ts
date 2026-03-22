type User = {
  id: string;
  email: string;
  nickname?: string;
};

// Extract only required fields
type RequiredUser = Required<User>;

// Extract only optional fields  
type OptionalFields = {
  [K in keyof User as User[K] extends Required<User>[K] ? never : K]: User[K]
};

// Remove null/undefined
type Config = string | null | undefined;
type CleanConfig = NonNullable<Config>;  // just string

// Real example - filtering arrays
const items = ['a', null, 'b', undefined, 'c'];
const clean = items.filter((x): x is NonNullable<typeof x> => x != null);
// clean is string[], not (string | null | undefined)[]

console.log(clean);  // ['a', 'b', 'c'];
