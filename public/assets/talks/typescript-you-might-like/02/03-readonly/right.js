// Must create a copy to sort, can't mutate the original
function processItems(items: readonly string[]): string[] {
  return [...items].sort();
}

// Or prevent mutation entirely
interface Config {
  readonly apiKey: string;
  readonly timeout: number;
}

const config: Config = { apiKey: 'secret', timeout: 5000 };
config.apiKey = 'new';  // ❌ Error - can't mutate
