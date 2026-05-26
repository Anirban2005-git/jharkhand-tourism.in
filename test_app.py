import pytest
from fastapi.testclient import TestClient
from sqlmodel import SQLModel, create_engine, Session, select
from main import app, get_session, Attraction  # ✅ FIXED (no 'main')

client = TestClient(app)

# ==========================================================
# FIXTURE: Use a separate SQLite DB for tests
# ==========================================================
@pytest.fixture(name="session")
def session_fixture():
    test_engine = create_engine("sqlite:///./test.db")
    SQLModel.metadata.create_all(test_engine)
    with Session(test_engine) as session:
        # ✅ Seed the test DB with one attraction if empty
        if not session.exec(select(Attraction)).first():
            session.add(Attraction(name="Test Attraction", description="Seeded by pytest"))
            session.commit()
        yield session
    SQLModel.metadata.drop_all(test_engine)

# ==========================================================
# Dependency Override
# ==========================================================
@app.dependency_overrides[get_session]
def override_get_session():
    engine = create_engine("sqlite:///./test.db")
    SQLModel.metadata.create_all(engine)
    with Session(engine) as session:
        yield session

# ==========================================================
# TESTS
# ==========================================================
def test_read_attractions(session):
    response = client.get("/attractions")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0  # ✅ We expect at least one attraction from seeding
    assert data[0]["name"] == "Test Attraction"
