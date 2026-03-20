interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  createdAt: Date;
}

type CreateUserRequest = Omit<User, 'id' | 'createdAt'>;
type UpdateUserRequest = Partial<CreateUserRequest>;
type UserResponse = Pick<User, 'id' | 'name' | 'email'>;
