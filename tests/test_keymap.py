from src import stubs


def test_keymap_bind_and_load():
    stubs.bind_action("accept", "KeyZ")
    keymap = stubs.load_keymap()
    assert keymap["accept"] == "KeyZ"
    assert stubs.open_preferences_dialog()
