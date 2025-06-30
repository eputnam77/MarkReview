from src import stubs


def test_diff_doc():
    diff = stubs.diff_doc("a\n", "b\n")
    assert any(line.startswith("-") or line.startswith("+") for line in diff)
