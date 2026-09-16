from fastapi import APIRouter
from server.database.base import todos

todo=APIRouter()

@todo.get("/todos")
def getTodos():
    return {"message":"todos api create"}

@todo.post("/todos")
def create_todos(body:dict):
    if body.get("title","") is None:
        return {"success":False,"message":"Title is required"}

    newTodos={
        "id":body.get("id",len(todos)+1),
        "title":body.get("title",""),
        "complete":body.get("complete",False)
    }
    todos.append(newTodos)
    return {"success":True,"message":"Todo created successfully","todo":newTodos}
    

@todo.delete("/todos/{todo_id}")
def delete_todo(todo_id:str):
    for todo in todos:
        if todo["id"]==todo_id:
            todos.remove(todo)
            return {"success":True,"message":"Todo deleted successfully"}

    return {"message":"todos not found"}

@todo.put("/todos/{todo_id}")
def update_todo(todo_id:str,body:dict):
    for todo in todos:
        if todo["id"]==todo_id:
         todo["title"] = body.get("title", todo["title"])
         todo["complete"] = body.get("complete", todo["complete"])
         
    return {"success":True,"message": "Todo updated successfully!"}