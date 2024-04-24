function * throttle(func, time) {
	let timerID = null;
	function throttled(arg) {
		clearTimeout(timerID);
		timerID = setTimeout(func.bind(window, arg), time);
	}
	while(true) throttled(yield);
}

const thr = throttle(console.log, 3000);

function startThrottle() {
  console.log('The Start');
  thr.next('');
}

function triggerSendComment() {
  thr.next('send this comment');
}