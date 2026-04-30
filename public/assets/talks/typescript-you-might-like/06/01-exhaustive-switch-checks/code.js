type Status = 'pending' | 'approved' | 'rejected';

function handleStatus(status: Status) {
  switch (status) {
    case 'pending':
      return 'Waiting...';
    case 'approved':
      return 'Success!';
    case 'rejected':
      return 'Failed';
    default:
      // This function ensures we handled all cases
      const _exhaustive: never = status;
      throw new Error(`Unhandled status: ${_exhaustive}`);
  }
}

// Later, someone adds a new status
type Status = 'pending' | 'approved' | 'rejected' | 'cancelled';

// The switch now shows an error at compile time! ✅
