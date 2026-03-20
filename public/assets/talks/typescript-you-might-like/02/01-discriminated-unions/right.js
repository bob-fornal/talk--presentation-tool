type Response = 
  | { status: 'success'; data: User }
  | { status: 'error'; error: string };

function handleResponse(res: Response) {
  if (res.status === 'success') {
    console.log(res.data.name);  // TypeScript KNOWS data exists
  } else {
    console.log(res.error);  // And here, error exists
  }
}
