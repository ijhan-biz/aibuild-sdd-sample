export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  due_date: string | null;
  priority: "low" | "medium" | "high";
}

export interface TodoCreateInput {
  title: string;
  completed?: boolean;
  due_date?: string | null;
  priority?: "low" | "medium" | "high";
}

export interface TodoUpdateInput {
  title?: string;
  completed?: boolean;
  due_date?: string | null;
  priority?: "low" | "medium" | "high";
}
