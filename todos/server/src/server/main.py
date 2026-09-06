from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app=FastAPI()

app.add_middleware(CORSMiddleware,allow_origins=["http://localhost:5173"],allow_methods=["GET","POST","DELETE","PUT"] )


todos=[]

print(todos)

@app.get("/")
def home():
    return {"message":"todos api create"}

@app.get("/todos")
def get_todos():
    return todos

@app.post("/todos")
def create_todos(body:dict):
    if body.get("title","") is None:
        return {"success":False,"message":"Title is required"}
    
    # newTodos={
    #           "id":len(todos)+1,
    #           "title":body["title"],
    #           "complete":False
    #           }
    newTodos={
        "id":body.get("id",len(todos)+1),
        "title":body.get("title",""),
        "complete":body.get("complete",False)
    }
    print(newTodos,'fdsa')
    todos.append(newTodos)
    return {"success":True,"message":"Todo created successfully","todo":newTodos}
    

@app.delete("/todos/{todo_id}")
def delete_todo(todo_id:str):
    for todo in todos:
        if todo["id"]==todo_id:
            todos.remove(todo)
            return {"success":True,"message":"Todo deleted successfully"}

    return {"message":"todos not found"}

@app.put("/todos/{todo_id}")
def update_todo(todo_id:str,body:dict):
    for todo in todos:
        if todo["id"]==todo_id:
         print(todo)
         todo["title"] = body.get("title", todo["title"])
         todo["complete"] = body.get("complete", todo["complete"])
         
    return {"success":True,"message": "Todo updated successfully!"}

# app["keys"]
# app.keys
# app.get("keys",default)


            

