from src import stubs


def test_build_review_panel():
    changes = [{"id": "b"}, {"id": "a"}]
    assert stubs.build_review_panel(changes) == ["a", "b"]
