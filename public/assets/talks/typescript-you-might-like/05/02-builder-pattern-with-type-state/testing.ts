interface ServerConfig {
  host: string;
  port: number;
  apiKey: string;
}

// Track which fields have been set
type ConfigBuilder<T extends Partial<ServerConfig> = {}> = {
  setHost: (host: string) => ConfigBuilder<T & { host: string }>;
  setPort: (port: number) => ConfigBuilder<T & { port: number }>;
  setApiKey: (key: string) => ConfigBuilder<T & { apiKey: string }>;
  build: T extends ServerConfig ? () => ServerConfig : never;
};

function createConfigBuilder<T extends Partial<ServerConfig> = {}>(state: T = {} as T): ConfigBuilder<T> {
  return {
    setHost: (host: string) => createConfigBuilder({ ...state, host }),
    setPort: (port: number) => createConfigBuilder({ ...state, port }),
    setApiKey: (key: string) => createConfigBuilder({ ...state, apiKey: key }),
    build: (() => state) as any,
  };
}

// Usage
const config = createConfigBuilder()
  .setHost('localhost')
  .setPort(3000)
  .setApiKey('secret')
  .build();  // ✅ Only works when all fields set

const incomplete = createConfigBuilder()
  .setHost('localhost')
  .build();  // ❌ Error - missing required fields
