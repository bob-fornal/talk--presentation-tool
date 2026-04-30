// Define service interfaces
interface Logger {
  log(message: string): void;
}

interface Database {
  query<T>(sql: string): Promise<T>;
}

interface Services {
  logger: Logger;
  database: Database;
}

// Container with type safety
class Container {
  private services = new Map<keyof Services, any>();

  register<K extends keyof Services>(
    name: K,
    service: Services[K]
  ): void {
    this.services.set(name, service);
  }

  get<K extends keyof Services>(name: K): Services[K] {
    return this.services.get(name);
  }
}

// Usage
const container = new Container();
container.register('logger', consoleLogger);
container.register('databse', db);  // ❌ Typo caught!

const logger = container.get('logger');
logger.log('Hello');  // ✅ Fully typed
