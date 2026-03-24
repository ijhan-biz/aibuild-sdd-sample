export type Priority = "low" | "medium" | "high";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  due_date: string | null;
  priority: Priority;
}

export interface TodoCreateInput {
  title: string;
  completed?: boolean;
  due_date?: string | null;
  priority?: Priority;
}

export interface TodoUpdateInput {
  title?: string;
  completed?: boolean;
  due_date?: string | null;
  priority?: Priority;
}
