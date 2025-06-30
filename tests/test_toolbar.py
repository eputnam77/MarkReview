from src import stubs


def test_setup_toolbar():
    storage = {}
    result = stubs.setup_toolbar(storage, "markup")
    assert result == "markup"
    assert storage["track_view"] == "markup"
