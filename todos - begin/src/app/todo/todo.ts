export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface TodoState {
  isLoading: boolean;
  memberTodos: Todo[];
  incompleteOnly: boolean;
  error: string | null;
}