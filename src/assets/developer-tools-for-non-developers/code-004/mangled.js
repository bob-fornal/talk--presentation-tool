function dtfndInit005() {
  const data = [
    "This", "is", "something", "to", "demo", "a", "process"
  ];
  let backward = [];
  for (let i = 0, len = data.length; i < len; i++) {
    const split = [...data[i].split('')];
    const reverseArray = split.reverse();
    reversed = reverseArray.join('');
    backward.push(reversed);
  }
  console.log(backward.reverse().join(' '));
}