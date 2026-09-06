import { Pencil, Plus, Trash } from "lucide-react";
import React, { useEffect } from "react";
import { v4 as uuid } from "uuid";

interface Todo {
  id: string;
  title: string;
  complete: boolean;
}

const App = () => {
  const [input, setInput] = React.useState("");
  const [todos, setTodos] = React.useState<Todo[]>([]);
  console.log(todos,'state wala console');
  const [error, setError] = React.useState("");

  const handleSubmit =async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!input.trim()) {
      setError("please enter todos");
      return;
    }

    const newTodo: Todo = {
      id: uuid(),
      title: input,
      complete: false,
    };

    try {
     const response = await fetch("http://localhost:8000/todos", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body:JSON.stringify(newTodo)
     }); 
     const data=await response.json();
     
      if (!data.success) {
        console.error("Error adding todo:", data.message);
        return;
      }
     setTodos([...todos, data.todo]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
    setInput("");
  };

  const handleDelete =async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8000/todos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      });
      const data = await response.json();
      if (!data.success) {
        console.log( "something went wrong",data.message);
        return;
      }
      const deleteData = todos.filter((obj) => obj.id !== id);
      setTodos(deleteData);
    } catch (error) {
      console.log(error, "something went wrong");
    }
  };

  // update api
  const handleChecked=async(id:string)=>{
       try {
        // find current todo status
         const todo=todos.find((obj)=>obj.id === id)
         if(!todo) return;

         const response = await fetch(`http://localhost:8000/todos/${id}`, {
           method: "PUT",
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify({complete:!todo.complete}),
         });
         const data = await response.json();
         if (!data.success) {
           console.log("Error updating todo:",data.message);
           return;
         }

         const updatedtodo = todos.map((obj) => {
           if (obj.id === id) {
             return { ...obj, complete: !obj.complete };
           }
           return obj;
         });
         setTodos(updatedtodo);
       } catch (error) {
         console.log(error, "something went wrong");
       }
  }

  // Get api
  const fetchTodosAPI=async()=>{
    try {
    const response=await fetch("http://localhost:8000/todos");
    const data=await response.json()
    setTodos(data)
    } catch (error) {
      console.log(error,"something went wrong");
    }
  }

  useEffect(()=>{
    //  api call to fastapi
    fetchTodosAPI();
    // const storedTodos=localStorage.getItem("todos");
    // if(storedTodos){
    //   setTodos(JSON.parse(storedTodos))
    // }
  },[])

  // useEffect(()=>{
  //   localStorage.setItem("todos",JSON.stringify(todos))
  // },[todos])


  return (
    <div className="h-screen w-full flex items-center justify-center  bg-linear-to-r from-purple-700 to-indigo-600 ">
      <div className="  px-10 py-4 bg-gray-100 shadow-md rounded-xl ">
        <h1 className="font-poppins font-medium text-center text-2xl">
          To-Do List
        </h1>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="relative flex gap-4 border p-1 border-gray-200 rounded-lg shadow-md focus-within:border-pink-400 focus:focus-within:right-2 focus:focus-within:bg-pink-100 ">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="please enter todos"
              className=" px-5 py-2 text-sm text-gray-700 placeholder:text-gray-400 outline-none"
            />
            <button
              type="submit"
              className="rounded-xl bg-linear-to-r tailwindcss(suggestCanonicalClasses) from-pink-500 to-rose-500  border-2 border-pink-600 px-5 py-1 text-sm font-medium text-white transition-all duration-200 hover:bg-[#ff6eae] hover:shadow-md cursor-pointer"
            >
              Add
            </button>
          </div>
          {error && <div className="text-red-600 ml-1">{error}</div>}
        </form>

        {todos.map((todo, index) => {
          return (
            <div key={index}>
              <div className="flex w-full items-center justify-between border rounded-sm mt-2 p-1">
                <input type="checkbox" checked={todo.complete} onChange={()=>handleChecked(todo.id)}/>
                <p className="text-black font-xl ml-1  ">{todo.title}</p>
                <div className="flex gap-1">
                  <Pencil className="text-orange-500 cursor-pointer" />
                  <Trash
                    onClick={() => handleDelete(todo.id)}
                    className=" text-red-600 cursor-pointer"
                  />
                  <Plus className="text-white bg-blue-500 cursor-pointer rounded-sm " />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
