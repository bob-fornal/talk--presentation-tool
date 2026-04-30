function parseJSON(json: string): unknown {
  return JSON.parse(json);
}

const data = parseJSON('{"name":"Bob"}');

// Must check before using
if (typeof data === 'object' && data !== null && 'name' in data) {
  console.log(data.name);  // Safe!
}
