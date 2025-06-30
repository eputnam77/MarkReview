from src import stubs


def test_attach_popup_controls_accept():
    text = "a {--b--}"
    assert stubs.attach_popup_controls("reject", text) == "a b"
