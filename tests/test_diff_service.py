from src import stubs


def test_start_diff_server():
    assert stubs.start_diff_server() == "started"
