from markreview import changebars


def test_apply_change_bars_placeholder() -> None:
    html = "<p>example</p>"
    result = changebars.apply_change_bars(html)
    assert result != html
