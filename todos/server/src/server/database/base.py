from sqlmodel import Session ,create_engine

DATABASE_URL="postgresql+psycopg://neondb_owner:npg_Uxj18kQqPOXZ@ep-misty-hill-b4wd5pc0-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

engine=create_engine(DATABASE_URL,echo=True,pool_pre_ping=True)
session=Session(engine)

def get_db():
    with Session(engine) as session:
        yield session
