interface Events {
  'user:created': { id: string; name: string };
  'user:deleted': { id: string };
  'post:published': { postId: string; title: string };
}

class TypedEmitter {
  on<K extends keyof Events>(
    event: K,
    handler: (data: Events[K]) => void
  ): void {
    // Implementation
  }

  emit<K extends keyof Events>(event: K, data: Events[K]): void {
    // Implementation
  }
}

const emitter = new TypedEmitter();

emitter.on('user:created', (data) => {
  console.log(data.name);  // ✅ Autocomplete!
});

emitter.emit('user:crated', { id: '1', name: 'Alice' });  // ❌ Typo caught!
emitter.emit('user:created', { id: '1' });  // ❌ Missing 'name'
