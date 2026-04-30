// Painful code - error appears far from the actual problem
class QueryBuilder<T> {
  private conditions: any[] = [];
  
  where<K extends keyof T>(field: K, value: T[K]) {
    this.conditions.push({ field, value });
    return this;
  }
  
  execute(): Promise<T[]> {
    return Promise.resolve([] as T[]);
  }
}

interface User {
  id: number;
  name: string;
  email: string;
}

// Error appears at the end of the chain, not where the mistake is
const query = new QueryBuilder<User>()
  .where('name', 'John')
  .where('email', 'john@example.com')
  .where('age', 25) // Typo: 'age' doesn't exist, but error is vague
  .where('id', 1)
  .execute(); // Error: shows up here with confusing message about the entire chain