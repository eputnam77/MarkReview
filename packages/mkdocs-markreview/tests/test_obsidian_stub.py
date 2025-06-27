from markreview import obsidian


def test_explore_obsidian_support_placeholder() -> None:
    assert obsidian.explore_obsidian_support() is True
