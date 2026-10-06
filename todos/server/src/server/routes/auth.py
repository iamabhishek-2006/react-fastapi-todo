from fastapi import APIRouter , Depends
from server.models.user import User, UserRegister,UserLogin
from server.database.base import get_db
from sqlmodel import Session,select

from pwdlib import PasswordHash
from server.service.jwt import generate_token
from server.service.user import get_current_user

auth=APIRouter()
password_hash=PasswordHash.recommended()

@auth.get("/me")
def get_user(db:Session=Depends(get_db),payload:str=Depends(get_current_user)):

   try:
    if payload["success"] is False:
       return {"success":False,"message":payload["message"]}

    user = db.exec(select(User).where(User.id == payload["user_id"])).first()

    if user is None:
       return {"success":False,"message":"something went wrong"}
    print(user,"user here")

    return {"success":True,"user":{
       "id":user.id,
       "name":user.name,
       "email":user.email
    }}
   except Exception as e:
      return {"success":False,"message":str(e)}

@auth.post("/register")
def register(body:UserRegister,db:Session=Depends(get_db)):

  try:

    if len(body.password) < 8:
      return {"success": False, "message": "Password must be at least 8 characters long!"}
    
    if body.password != body.confirm_password:
        return {"success":False,"error":"password does not match"}

    user=db.exec(select(User).where(User.email==body.email)).first()

    if user is not None:
        return {"success":False,"message":"User already exists"}

    newUser=User(
        name=body.name,
        email=body.email,
        password=password_hash.hash(body.password)  # hash password
    )

    db.add(newUser)
    db.commit()

    return {"success":True,"message":"User created successfully"}
  except Exception as e:
     return {"success":False,"message":str(e)}
        
@auth.post("/login")
def login(body:UserLogin,db:Session=Depends(get_db)):

   try:
    user=db.exec(select(User).where(User.email ==body.email)).first()

    if user is None:
       return {"success":False,"message":"User not found"}

    if not password_hash.verify(body.password,user.password):
       return {"success":False,"message":"password does not match"}

    token=generate_token(user.id)

    return {"success":True, "message":"user logged in successfull","access_token":token}
   
   except Exception as e:
      return {"success":False,"message":str(e)}
    
    
