type UserId = string & { readonly __brand: 'UserId' };
type PostId = string & { readonly __brand: 'PostId' };

function createUserId(id: string): UserId {
  return id as UserId;
}

function createPostId(id: string): PostId {
  return id as PostId;
}

function getUser(id: UserId) {}
function getPost(id: PostId) {}

const userId = createUserId('123');
const postId = createPostId('456');

getUser(postId);  // ❌ Type error!
getUser(userId);  // ✅ Works
