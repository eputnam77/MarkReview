from src import stubs


def test_track_format_changes():
    old = "Hello world"
    new = "Hello **world** bold"
    diff = stubs.track_format_changes(old, new)
    assert "**world**".strip("*") in " ".join(diff)
