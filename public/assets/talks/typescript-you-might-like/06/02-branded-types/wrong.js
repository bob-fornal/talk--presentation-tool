// Problem: Both are just strings
type UserId = string;
type PostId = string;

function getUser(id: UserId) {}
function getPost(id: PostId) {}

const userId: UserId = '123';
const postId: PostId = '456';

getUser(postId);  // ❌ Should error, but doesn't!
