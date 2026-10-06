from sqlmodel import SQLModel , Field
import uuid 

class User(SQLModel,table=True):
    id: uuid.UUID = Field(primary_key=True, default_factory=uuid.uuid4)
    name:str
    email:str=Field(unique=True)
    password:str 

class UserRegister(SQLModel):
    name:str
    email:str
    password:str
    confirm_password:str

class UserLogin(SQLModel):
    email:str
    password:str


#id: str = Field(default_factory=lambda: str(uuid4()), primary_key=True)  # Yeh line zaroori hai
