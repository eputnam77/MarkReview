from src import stubs


def test_get_current_user():
    user = stubs.get_current_user()
    assert user["id"] == "anonymous"
    assert user["name"] == "Anonymous"
