from fastapi import FastAPI,Body
from fastapi.middleware.cors import CORSMiddleware
from server.routes.base import base
from server.routes.auth import auth
from server.routes.todo import todo


app=FastAPI()

app.add_middleware(CORSMiddleware,allow_origins=["http://localhost:5173"],allow_methods=["GET","POST","DELETE","PUT"] )

app.include_router(base)
app.include_router(auth)
app.include_router(todo)





            

