from fastapi import FastAPI
from app.controllers.notes_controller import router as notes_router
from app.db import connect_to_database, disconnect_from_database, create_notes_table
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


origins = [
    "http://localhost",
    "http://localhost:3000",  
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],  
    allow_headers=["*"],  
)

app.include_router(notes_router, prefix="/api")

@app.on_event("startup")
async def startup_event():
    await connect_to_database()
    await create_notes_table()

@app.on_event("shutdown")
async def shutdown_event():
    await disconnect_from_database()
