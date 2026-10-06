import React, {  useEffect, useRef, useState } from "react";
import withAuth from "../components/withAuth";
import {Loader,Loader2,Pencil,PenSquare,Plus,PlusCircle,Trash,Trash2} from "lucide-react";
import { useTodo } from "../context/todo.context";
import "../styles/todos.scss";
import { useAuth } from "../hooks/useAuth";

const Todos = () => {
  const { user } = useAuth();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [input, setInput] = React.useState("");
  const { todos, setTodos, todosLoading, setTodosLoading } = useTodo();
  const [addingTodo, setAddingTodo] = useState(false);
  const [updateStatus, setUpdateStatus] = useState<boolean | string | null>(false);
  const [deletingTodo, setDeletingTodo] = useState<boolean | string | null>(false);
  const [duplicateTodo, setDuplicateTodo] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setAddingTodo(true);
    try {
      if (input.length === 0) {
        alert("please enter todo title");
        return;
      }
      const response = await fetch("http://localhost:8000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title: input, user_id: user?.id }),
      });
      const data = await response.json();
      if (!data.success) {
        console.error("Error adding todo:", data.message);
        return;
      }
      setTodos([...todos, data.todo]);
    } catch (error) {
      console.error("Error adding todo:", error);
    } finally {
      setAddingTodo(false);
      setInput("");
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingTodo(id);
    try {
      //  const todo = todos.find((obj) => obj.id === id);
      
      //  const updatedTodos = todos.filter((obj) => obj.id !== id);
      //  setTodos(updatedTodos);

      const response = await fetch(`http://localhost:8000/todos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (!data.success) {
        console.log("something went wrong", data.message);
        // setTodos([...updatedTodos,todo]);
        return;
      }
      const deleteData = todos.filter((obj) => obj.id !== id);
      setTodos(deleteData);
    } catch (error) {
      console.log(error, "something went wrong");
    } finally {
      setDeletingTodo(null);
    }
  };

  // update api
  const handleChecked = async (id: string) => {
    setUpdateStatus(id);
    try {
      // find current todo status
      const todo = todos.find((obj) => obj.id === id);
      if (!todo) return;

      const response = await fetch(`http://localhost:8000/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ completed: !todo.completed }),
      });
      const data = await response.json();
      if (!data.success) {
        console.log("Error updating todo:", data.message);
        return;
      }

      const updatedtodo = todos.map((obj) => {
        if (obj.id === id) {
          return { ...obj, completed: !obj.completed };
        }
        return obj;
      });
      setTodos(updatedtodo);
    } catch (error) {
      console.log(error, "something went wrong");
    } finally {
      setUpdateStatus(null);
    }
  };

  const handleDuplicate = async (todo:{id:string,title:string}) => {
    setDuplicateTodo(todo.id);
    try {
      const response = await fetch("http://localhost:8000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title: todo.title, user_id: user?.id }),
      });
      const data = await response.json();

      if (!data.success) {
        console.error("Error adding todo:", data.message);
        return;
      }

      setTodos([...todos, data.todo]);
    } catch (error) {
      console.error("Error adding todo:", error);
    } finally {
      setDuplicateTodo(null);
    }
  };

  // Get api
  const fetchTodosAPI = async () => {
    setTodosLoading(true);
    try {
      const response = await fetch("http://localhost:8000/todos", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setTodos(data.todos);
    } catch (error) {
      console.log(error, "something went wrong");
    } finally {
      setTodosLoading(false);
    }
  };

  useEffect(() => {
    if (!todos.length) fetchTodosAPI();
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, [todos]);

  return (
    <div className="todos-container">
      <h1 className="heading">To-Do</h1>
      <h6 className="font">Manage Your Days!</h6>
      <form
        onSubmit={handleSubmit}
        className={`form ${addingTodo ? "disabled" : ""}`}
      >
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => !addingTodo && setInput(e.target.value)}
          disabled={addingTodo}
        />
        <button type="submit">
          {addingTodo ? <Loader className="spin" /> : <Plus className="icon" />}
        </button>
      </form>
      <div className="todos_container">
        {todos.length === 0 && !todosLoading && (
          <div className="tips">
            Add Your First To-Do Item! <br />
            📝 Usage Tips 💡: <br /> ✔️ Press Enter to submit actions. <br /> ✔️
            Drag to reorder your to-dos (PC only) <br /> ✔️ Double-click to edit
            slogan and tasks. <br /> ✔️ Access quick actions in the right
            sidebar. <br /> 🔒 Your data is stored locally in your browser.
            <br /> 📝 Supports data download and import.
          </div>
        )}

        {todosLoading && <div className="todos-loading">Loading...</div>}

        {todos.map((todo, index) => {
          return (
            <div key={index} className="todo_item">
              {updateStatus === todo.id ? (
                <Loader2 className="spin" />
              ) : (
                <input
                  checked={todo.completed}
                  type="checkbox"
                  onChange={() => handleChecked(todo.id)}
                />
              )}

              <p>{todo.title}</p>

              {deletingTodo === todo.id ? (
                <Loader2 className="spin trash" />
              ) : (
                <Trash2
                  className="trash"
                  onClick={() => handleDelete(todo.id)}
                />
              )}

              {duplicateTodo ? (
                <Loader2 className="spin duplicate" />
              ) : (
                <PlusCircle
                  className="duplicate"
                  onClick={() => handleDuplicate(todo)}
                />
              )}
              <PenSquare className="edit" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default withAuth(Todos);
