interface CreateUserRequest {
  name: string;
  email: string;
  age: number;
}

interface UpdateUserRequest {
  name: string;      // Duplicated!
  email: string;     // Duplicated!
  age: number;       // Duplicated!
}