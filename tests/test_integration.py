import re
from pathlib import Path


def test_docusaurus_package_removed():
    assert not Path("packages/docusaurus-plugin-trackchanges").exists()


def hex_to_lum(value: str) -> float:
    r = int(value[1:3], 16) / 255
    g = int(value[3:5], 16) / 255
    b = int(value[5:7], 16) / 255

    def channel(c: float) -> float:
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4

    r, g, b = map(channel, (r, g, b))
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def contrast_ratio(foreground: str, background: str) -> float:
    l1, l2 = hex_to_lum(foreground), hex_to_lum(background)
    if l1 < l2:
        l1, l2 = l2, l1
    return (l1 + 0.05) / (l2 + 0.05)


def test_styles_accessible():
    css_path = Path("src/styles.css")
    css = css_path.read_text()
    add_color = re.search(r"--markreview-add-color:\s*(#[0-9a-fA-F]{6})", css).group(1)
    del_color = re.search(r"--markreview-del-color:\s*(#[0-9a-fA-F]{6})", css).group(1)
    assert contrast_ratio(add_color, "#ffffff") >= 4.5
    assert contrast_ratio(del_color, "#ffffff") >= 4.5
