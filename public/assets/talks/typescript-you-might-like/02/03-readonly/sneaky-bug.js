function processItems(items: string[]) {
  items.sort();  // 💣 Mutates the original array!
  return items;
}

const myList = ['c', 'a', 'b'];
processItems(myList);
console.log(myList);  // ['a', 'b', 'c'] - Oops!
