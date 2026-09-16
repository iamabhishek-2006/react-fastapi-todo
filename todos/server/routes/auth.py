from fastapi import Body
from fastapi import APIRouter
from server.database.base import users

auth=APIRouter()

@auth.post("/user/register")
def create_user(body:dict=Body(...) ):

    name=body.get("name")
    email=body.get("email")
    password=body.get("password")
    confirm_password=body.get("confirm_password")

    if name is None:
        return {"success":False,"error":"name is required"}

    if email is None:
        return {"success":False,"error":"email is required"}
    
    if password != confirm_password:
        return {"success":False,"error":"password does not match"}
    
    newUser={
        "name":name,
        "email":email,
        "password":password,
        "confirm_password":password
    }

    users.append(newUser)
    print(users)
    return {"success":True,"message":"User created successfully"}



@auth.post("/user/login")
def login_user(body:dict=Body(...)):

    print("users",users)

    email=body.get("email")
    password=body.get("password")

    print("email",email)
    print("password",password)

    if not email or not password:
     return {"success":False,"error":"email and password is required"}

    user_found=None
    for user in users:
        if user["email"]==email:
            user_found=user
            break

    if user_found is None:
        return {"success":False,"error":"user not found"}

    if user_found["password"] != password:
        return {"success":False,"error":"Incorrect password"}

    return {"success":True, "message":"user login successfull", 
    "user":{"name":user_found["name"], "email":user_found["email"]}}