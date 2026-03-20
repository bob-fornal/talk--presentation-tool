// Over Engineering
function getValue<T, K extends keyof T, V extends T[K]>(
  obj: T,
  key: K
): V {
  return obj[key] as V;
}
