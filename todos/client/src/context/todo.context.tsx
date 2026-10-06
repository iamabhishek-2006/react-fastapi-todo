import { createContext, useContext, useState } from "react";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

type TodoContextType = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  todosLoading: boolean;
  setTodosLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

 const todoContext = createContext<TodoContextType | null>(null);

 const TodoContext = ({ children }: {children:React.ReactNode}) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosLoading, setTodosLoading] = useState<boolean>(false);

  return (
    <todoContext.Provider
      value={{ todos, setTodos, todosLoading, setTodosLoading}}>
      {children}
    </todoContext.Provider>
  );
};

export { todoContext, TodoContext };

export const useTodo=()=>{
    const context=useContext(todoContext);
    if(!context){
        throw new Error("useTodo must be used within a TodoProvider")
    }
    return context
}
