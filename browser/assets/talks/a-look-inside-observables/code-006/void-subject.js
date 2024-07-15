/* Sometimes the emitted value doesn't matter as
   much as the fact that a value was emitted.

   Before version 7, the default type of Subject
   values was any. Subject<any> disables type
   checking of the emitted values, whereas
   Subject<void> prevents accidental access
   to the emitted value. If you want the old
   behavior, then replace Subject with Subject<any>.
*/
function dtfndDemo7() {
  const { Subject } = rxjs;
  const subject = new Subject();
  // Shorthand for Subject<void>
  
  subject.subscribe({
    next: () => console.log('One second has passed'),
  });
  
  setTimeout(() => subject.next(), 1000);
}
