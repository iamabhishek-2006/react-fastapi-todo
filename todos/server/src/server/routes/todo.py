from fastapi import APIRouter , Depends
from server.models.todo import Todo, TodoCreate, TodoUpdate
from sqlmodel import Session,select
from server.database.base import get_db
from server.service.user import get_current_user

todo=APIRouter()

@todo.get("")
def getTodos(db:Session=Depends(get_db),payload:str=Depends(get_current_user)):
   try:
      #  todo=db.exec(select(Todo)).all()
       if payload["success"] is False:
          return {"success":False,"message":payload["message"]}

       todo=db.exec(select(Todo).where(Todo.user_id == payload["user_id"])).all()
       print(todo)
       
       return {"success":True,"todos": todo}
   except Exception as e:
      return {"success":False,"message":str(e)}
   
@todo.post("")
def create_todos(body:TodoCreate,db:Session=Depends(get_db),payload:str=Depends(get_current_user)):

   print(payload,'this is payload overhead')

   if payload["success"] is False:
      return {"success":False,"message":payload["message"]}

   try:
    newTodo=Todo(
        title=body.title,
        user_id=payload["user_id"]
    )

    db.add(newTodo)
    db.commit()
    db.refresh(newTodo)
    
    return {"success":True,"message":"Todo created successfully","todo":newTodo}
   except Exception as e:
      return {"success":False,"message":str(e)}


@todo.put("/{todo_id}")
def update_todo(todo_id:str,body:TodoUpdate,db:Session=Depends(get_db),payload:str=Depends(get_current_user)):

   try:
    if payload["success"] is False:
       return {"success":False,"message":payload["message"]}
    
    todo= db.exec(select(Todo).where(Todo.id == todo_id,Todo.user_id == payload["user_id"])).first()

    if todo is None:
        return {"success":False,"message":"Todo not found"}

    if body.title is not None:
       todo.title=body.title

    if body.completed is not None:
       todo.completed=body.completed

    db.commit()

    return {"success":True,"message": "Todo updated successfully!"}
   except Exception as e:
      return {"success":False,"message":str(e)}
 

@todo.delete("/{todo_id}")
def delete_todo(todo_id:str,db:Session=Depends(get_db),payload:str=Depends(get_current_user)):

  try:
    if payload["success"] is False:
       return {"success":False,"message":payload["message"]}

    todo=db.exec(select(Todo).where(Todo.id == todo_id, Todo.user_id == payload["user_id"])).first()

    if todo is None:
       return {"success":False,"message":"Todo not found!"}

    db.delete(todo)
    db.commit()

    return {"success":True,"message":"todos deleted successfully"}
  except Exception as e:
     return {"success":False,"message":str(e)}


