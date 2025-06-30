from src import stubs


def test_register_panel_extension():
    stubs.register_panel_extension("fudgeai")
    assert "fudgeai" in stubs.get_panel_extensions()
