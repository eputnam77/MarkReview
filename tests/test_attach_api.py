from src import stubs


def test_attach_returns_controller():
    editor = object()
    ctrl = stubs.attach(editor)
    assert hasattr(ctrl, "accept_all")
    assert ctrl.editor is editor
