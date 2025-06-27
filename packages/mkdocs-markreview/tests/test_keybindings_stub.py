from markreview import keybindings


def test_activate_keybindings_placeholder() -> None:
    assert keybindings.activate_keybindings() is True
