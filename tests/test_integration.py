import os
import re
import subprocess
import textwrap
import time
from html.parser import HTMLParser
from pathlib import Path

from mkdocs_markreview.plugin import MarkReviewPlugin


def test_mkdocs_build(tmp_path):
    plugin = MarkReviewPlugin()
    config = {"markdown_extensions": [], "site_dir": str(tmp_path / "site")}
    plugin.on_config(config)
    html = "<html><head></head><body>Hello {++World++}!</body></html>"
    out = plugin.on_post_page(html)
    plugin.on_post_build()
    assert "markreview.css" in out
    assert "markreview.js" in out
    assert (tmp_path / "site" / "markreview.css").exists()
    assert (tmp_path / "site" / "markreview.js").exists()


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


def test_accessibility_and_performance(tmp_path):
    js_path = Path("mkdocs_markreview/assets/markreview.js")
    css_path = Path("mkdocs_markreview/assets/markreview.css")
    assert js_path.stat().st_size <= 8 * 1024
    assert css_path.stat().st_size <= 5 * 1024

    css = css_path.read_text()
    add_color = re.search(r"--markreview-add-color:\s*(#[0-9a-fA-F]{6})", css).group(1)
    del_color = re.search(r"--markreview-del-color:\s*(#[0-9a-fA-F]{6})", css).group(1)
    assert contrast_ratio(add_color, "#ffffff") >= 4.5
    assert contrast_ratio(del_color, "#ffffff") >= 4.5

    plugin = MarkReviewPlugin()
    config = {"markdown_extensions": [], "site_dir": str(tmp_path)}
    plugin.on_config(config)
    base_html = "<html><head></head><body><p>Hello</p></body></html>"
    parser = HTMLParser()
    start = time.perf_counter()
    parser.feed(base_html)
    base = time.perf_counter() - start

    out = plugin.on_post_page(base_html)
    parser = HTMLParser()
    start = time.perf_counter()
    parser.feed(out)
    delta = time.perf_counter() - start - base
    assert delta * 1000 < 20
    js_text = js_path.read_text()
    css_text = css_path.read_text()
    assert "aria-label" in js_text
    assert "highlight" in js_text
    assert "comment" in js_text
    assert "critic-comment" in css_text
    assert "--markreview-highlight-bg" in css_text
