from src import stubs


def test_persist_marks():
    text = "Hello {++New++} {--Old--}"
    accepted = stubs.persist_marks(text, accept=True)
    rejected = stubs.persist_marks(text, accept=False)
    assert "New" in accepted and "Old" not in accepted
    assert "Old" in rejected and "New" not in rejected
