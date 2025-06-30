from src import stubs


def test_diff_doc():
    diff = stubs.diff_doc("a\n", "b\n")
    assert any("---" in line or "+++" in line for line in diff)
