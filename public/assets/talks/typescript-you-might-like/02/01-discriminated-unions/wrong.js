interface Response {
  success: boolean;
  data?: User;
  error?: string;
}

function handleResponse(res: Response) {
  if (res.success) {
    console.log(res.data.name);  // Still might be undefined!
  }
}
