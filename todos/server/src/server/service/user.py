from fastapi import Request
import jwt
from server.service.jwt import verify_token

def get_current_user(request:Request):
    try:
     auth_header=request.headers.get("Authorization")

     if auth_header is None:
        return {"success":False,"message":"Authorization header not found"}

     parts=auth_header.split(" ")

     if parts[0].lower() != "bearer":
        return {"success":False,"message":"Invalid authorization header"}

     token=parts[1]

     if token is None:
        return {"success":False,"message":"Invalid authorization header!"}

     payload=verify_token(token)

     if payload is None:
        return {"success":False,"message":"Something went wrong"}

     if "sub" not in payload:
        return {"success":False,"message":"Something went wrong id not found"}
     
     return {"success": True, "user_id": payload["sub"]}

    except jwt.ExpiredSignatureError:
       return {"success":False,"message":"Session expired! please login again"}

    except jwt.InvalidTokenError:
       return {"success":False,"message":"Something went wrong! please login again"}
    
    except Exception as e:
        return {"success":False,"message":str(e)}