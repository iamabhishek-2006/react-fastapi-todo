from sqlmodel import SQLModel , Field
import uuid

class Todo(SQLModel,table=True):
    id:uuid.UUID=Field(primary_key=True,default_factory=uuid.uuid4)
    title:str=Field(max_length=100)
    completed:bool=Field(default=False)
    user_id:str

class TodoCreate(SQLModel):
    title:str

class TodoUpdate(SQLModel):
    title:str | None=None
    completed:bool | None=None
