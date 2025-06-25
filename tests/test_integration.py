import os
import re
import subprocess
import textwrap
import time
from html.parser import HTMLParser
from pathlib import Path

from marktrace.plugin import MarkTracePlugin


def test_mkdocs_build(tmp_path):
    plugin = MarkTracePlugin()
    config = {"markdown_extensions": [], "site_dir": str(tmp_path / "site")}
    plugin.on_config(config)
    html = "<html><head></head><body>Hello {++World++}!</body></html>"
    out = plugin.on_post_page(html)
    plugin.on_post_build()
    assert "marktrace.css" in out
    assert "marktrace.js" in out
    assert (tmp_path / "site" / "marktrace.css").exists()
    assert (tmp_path / "site" / "marktrace.js").exists()


def test_docusaurus_build(tmp_path):
    node_modules = tmp_path / "node_modules" / "remark-critic-markup"
    node_modules.mkdir(parents=True)
    (node_modules / "index.js").write_text("module.exports = () => {};\n")
    script = tmp_path / "run.js"
    script.write_text(
        textwrap.dedent(
            """
            const pluginFactory = require(process.argv[2]);
            const siteDir = process.argv[3];
            const baseUrl = '/sub/';
            const path = require('path');
            const fs = require('fs');
            (async () => {
              const plugin = pluginFactory({ siteDir, baseUrl });
              const opts = plugin.configureMDX({});
              if (!Array.isArray(opts.remarkPlugins) || opts.remarkPlugins.length === 0) process.exit(1);
              await plugin.loadContent();
              const tags = plugin.injectHtmlTags();
              const css = fs.existsSync(path.join(siteDir, 'static', 'marktrace.css'));
              const js = fs.existsSync(path.join(siteDir, 'static', 'marktrace.js'));
              const injected = JSON.stringify(tags);
              if (css && js && injected.includes('/sub/marktrace.js') && injected.includes('/sub/marktrace.css')) process.exit(0); else process.exit(1);
            })();
            """
        )
    )
    env = os.environ.copy()
    env["NODE_PATH"] = str(tmp_path / "node_modules")
    plugin_path = (
        Path(__file__).resolve().parents[1]
        / "packages/docusaurus-plugin-trackchanges/src/index.js"
    )
    result = subprocess.run(
        [
            "node",
            str(script),
            str(plugin_path),
            str(tmp_path),
        ],
        env=env,
    )
    assert result.returncode == 0


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
    js_path = Path("packages/mkdocs-marktrace/marktrace/assets/marktrace.js")
    css_path = Path("packages/mkdocs-marktrace/marktrace/assets/marktrace.css")
    assert js_path.stat().st_size <= 8 * 1024
    assert css_path.stat().st_size <= 5 * 1024

    css = css_path.read_text()
    add_color = re.search(r"--marktrace-add-color:\s*(#[0-9a-fA-F]{6})", css).group(1)
    del_color = re.search(r"--marktrace-del-color:\s*(#[0-9a-fA-F]{6})", css).group(1)
    assert contrast_ratio(add_color, "#ffffff") >= 4.5
    assert contrast_ratio(del_color, "#ffffff") >= 4.5

    plugin = MarkTracePlugin()
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
    assert "--marktrace-highlight-bg" in css_text
