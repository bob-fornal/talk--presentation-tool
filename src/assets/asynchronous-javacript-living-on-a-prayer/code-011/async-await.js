let resolveCheck = true;
const time = 2000;
const success = `Doing something here ... after ${time}ms.`;
const fail = `Failed here ... after ${time}ms.`;

function startAsyncAwaitResolve() {
  startAsyncAwait(true);
}
function startAsyncAwaitReject() {
  startAsyncAwait(false);
}

function startAsyncAwait(resolveState = true) {
  resolveCheck = resolveState;
  console.log('The Start');
  triggerAsyncAwait();
  console.log('The End');
}

async function triggerAsyncAwait() {
  try {
    console.log(await processAsync());
  } catch (error) {
    console.log(error);
  }
}

function processAsync() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolveCheck === true ? resolve(success) : reject(fail), time);
  });
}