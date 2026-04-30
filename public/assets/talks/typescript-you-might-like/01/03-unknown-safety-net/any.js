function parseJSON(json: string): any {
  return JSON.parse(json);
}

const data = parseJSON('{"name":"Bob"}');
data.doesNotExist.causesRuntimeError();  // No compile error!
