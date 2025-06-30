from src import stubs


def test_apply_change_bars():
    text = "a {++b++} c {--d--}"
    assert stubs.apply_change_bars(text) == 2
