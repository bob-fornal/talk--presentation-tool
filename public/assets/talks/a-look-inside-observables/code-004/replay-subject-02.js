/* You can also specify a window time in milliseconds,
   besides the buffer size, to determine how old the
   recorded values can be.
*/
function dtfndDemo5() {
  const { ReplaySubject } = rxjs;
  // buffer 3 values for new subscribers
  const subject = new ReplaySubject(100, 500 /* windowTime */);
 
  subject.subscribe({
    next: (v) => console.log(`observerA: ${v}`),
  });
  
  let i = 1;
  let interval = setInterval(() => {
    subject.next(i++);
    if (i === 10) clearInterval(interval);
  }, 200);
  
  setTimeout(() => {
    subject.subscribe({
      next: (v) => console.log(`observerB: ${v}`),
    });
  }, 1000);
}
