type Route = `/users/${string}` | `/posts/${string}` | '/home';

function navigate(route: Route) {
  window.location.href = route;
}

navigate('/users/123');  // ✅
navigate('/posts/abc');  // ✅
navigate('/user/123');   // ❌ Typo caught!
