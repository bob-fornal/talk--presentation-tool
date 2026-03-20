type LoadingState<T> = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

function UserProfile({ state }: { state: LoadingState<User> }) {
  switch (state.status) {
    case 'idle':
      return <div>Click to load</div>;
    case 'loading':
      return <Spinner />;
    case 'success':
      return <div>{state.data.name}</div>;  // data guaranteed here
    case 'error':
      return <div>{state.error.message}</div>;  // error guaranteed here
  }
}
