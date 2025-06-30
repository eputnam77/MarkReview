from src import stubs


def test_parse_critic_markup():
    text = "Hello {++World++} {--old--}"
    changes = stubs.parse_critic_markup(text)
    assert {"type": "add", "text": "World"} in changes
    assert {"type": "delete", "text": "old"} in changes
