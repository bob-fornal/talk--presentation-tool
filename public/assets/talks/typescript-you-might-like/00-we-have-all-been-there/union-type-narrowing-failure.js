// Painful code - TypeScript can't narrow the type properly
type SuccessResponse = {
  status: 'success';
  data: { value: number };
};

type ErrorResponse = {
  status: 'error';
  error: { message: string };
};

type Response = SuccessResponse | ErrorResponse;

function handleResponse(response: Response) {
  if (response.status === 'success') {
    // Error: Property 'data' does not exist on type 'Response'
    // Property 'data' does not exist on type 'ErrorResponse'
    // But we just checked the status!
    console.log(response.data.value);
  }
}

// Even worse with multiple conditions
function complexHandling(response: Response, shouldLog: boolean) {
  if (shouldLog) {
    console.log('Processing...');
  }
  
  if (response.status === 'success') {
    // STILL doesn't narrow properly after unrelated condition
    console.log(response.data.value); // Error!
  }
}