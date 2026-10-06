from fastapi import FastAPI

app=FastAPI()

@app.get("/")
def home():
    return {
        "message":"Hellow world"
    }

@app.get("/about")
def about():
    return {"message":"about page"}


