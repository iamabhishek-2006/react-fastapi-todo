from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from server.routes.base import base
from server.routes.auth import auth
from server.routes.todo import todo
from sqlmodel import SQLModel
from server.database.base import engine

app=FastAPI()

app.add_middleware(CORSMiddleware,allow_origins=["http://localhost:5173"],allow_methods=["GET","POST","DELETE","PUT"] ,allow_headers=["*"])

@app.on_event("startup")
def create_table():
    SQLModel.metadata.create_all(engine)

app.include_router(base)
app.include_router(auth,prefix="/auth")
app.include_router(todo,prefix="/todos")





    