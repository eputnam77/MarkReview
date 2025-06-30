from src import stubs


def test_finalize_ga_release():
    assert stubs.finalize_ga_release() == "1.0.0"
