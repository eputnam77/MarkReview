from src import stubs


def test_accessibility_audit():
    assert stubs.run_accessibility_intl_audit()
