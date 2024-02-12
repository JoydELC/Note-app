from databases import Database

# Crea una instancia de la clase Database
database = Database("postgresql://postgres:joyd@localhost:5432/postgres")

async def connect_to_database():
    await database.connect()

async def disconnect_from_database():
    await database.disconnect()

async def create_notes_table():
    query = """
    CREATE TABLE IF NOT EXISTS notes (
        id SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        content TEXT NOT NULL,
        archived BOOLEAN NOT NULL DEFAULT FALSE
    );
    """
    await database.execute(query)
