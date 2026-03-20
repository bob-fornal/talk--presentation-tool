interface Config {
  host: string;
  port: number;
  apiKey: string;
}

// Track which fields have been set
type ConfigBuilder<T extends Partial<Config> = {}> = {
  setHost: (host: string) => ConfigBuilder<T & { host: string }>;
  setPort: (port: number) => ConfigBuilder<T & { port: number }>;
  setApiKey: (key: string) => ConfigBuilder<T & { apiKey: string }>;
  build: T extends Config ? () => Config : never;
};

// Usage
const config = new ConfigBuilder()
  .setHost('localhost')
  .setPort(3000)
  .setApiKey('secret')
  .build();  // ✅ Only works when all fields set

const incomplete = new ConfigBuilder()
  .setHost('localhost')
  .build();  // ❌ Error - missing required fields
