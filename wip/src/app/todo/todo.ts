import { User } from "../user/user";

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface TodoState {
  isLoading: boolean;
  currentMember: User | undefined;
  memberTodos: Todo[];
  incompleteOnly: boolean;
  error: string | null;
}