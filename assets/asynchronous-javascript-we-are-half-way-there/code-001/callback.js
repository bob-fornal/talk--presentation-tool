// based on jQuery $.ajax(_object)
/*
  _object = {
    type: 'GET',
    url: 'my/url/',
    isTrue: true
  }
*/

function ajax(_object, callback = null) {
  const complete = function (fnResponse) {
    if (callback) {
      callback(fnResponse);
    }
  };

  const request = new XMLHttpRequest();

  request.open(_object.type || 'GET', _object.url, _object.isTrue || true);

  request.onreadystatechange = function(event) {
    if (request.readyState === 4 && request.status >= 200 && request.status < 400) {
      complete(request.responseText);
    } else {
      complete(request.statusText);
    }
  }

  request.send();
}

function startCallback() {
  ajax({ url: 'https://api.chucknorris.io/jokes/random' }, handleSuccess);
}

function handleSuccess(data) {
  if (data.length === 0) return;
  console.log(JSON.parse(data));
}