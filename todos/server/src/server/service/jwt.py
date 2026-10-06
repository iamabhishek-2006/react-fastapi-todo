import jwt
from datetime import datetime,timedelta,timezone
import uuid

secret_key="jfsdkjofowidfjjfdskhfuewhaklkfgr"
alg="HS256"

def generate_token(user_id):
    now=datetime.now(timezone.utc)
    payload={
        "sub":str(user_id),
        "iat":now,
        "exp":now+timedelta(days=11)
    }

    token=jwt.encode(payload,secret_key,algorithm=alg)
    return token

def verify_token(token):
    payload=jwt.decode(token,secret_key,algorithms=[alg])
    return payload