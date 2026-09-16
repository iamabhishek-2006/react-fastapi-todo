from fastapi import APIRouter

base=APIRouter()

@base.get("/")
def home():
    return {"message":"Welcome to the Todo API!"}

