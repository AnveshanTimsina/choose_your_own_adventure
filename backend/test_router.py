from fastapi.testclient import TestClient
from main import app

client = TestClient(app)
try:
    response = client.get("/api/stories/1/complete")
    print(response.json())
except Exception as e:
    import traceback
    traceback.print_exc()
