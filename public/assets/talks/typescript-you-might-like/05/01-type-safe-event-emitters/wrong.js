emitter.on('user:created', (data) => {
  console.log(data.name);  // What properties exist?
});

emitter.emit('user:crated', user);  // Typo!
