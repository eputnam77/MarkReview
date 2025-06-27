import importlib
import sys
import types
from typing import Any

# Stub mkdocs modules before importing the plugin
mkdocs: Any = types.ModuleType("mkdocs")
plugins: Any = types.ModuleType("mkdocs.plugins")


class FakePlugin:
    pass


plugins.BasePlugin = FakePlugin
mkdocs.plugins = plugins
sys.modules.setdefault("mkdocs", mkdocs)
sys.modules.setdefault("mkdocs.plugins", plugins)

MarkReviewPlugin = importlib.import_module("markreview.plugin").MarkReviewPlugin


def test_on_config_adds_extension(tmp_path: Any) -> None:
    plugin = MarkReviewPlugin()
    config = {"markdown_extensions": [], "site_dir": str(tmp_path)}
    plugin.on_config(config)
    assert "pymdownx.critic" in config["markdown_extensions"]


def test_post_page_injects_assets(tmp_path: Any) -> None:
    plugin = MarkReviewPlugin()
    config = {"markdown_extensions": [], "site_dir": str(tmp_path)}
    plugin.on_config(config)

    html = "<html><head></head><body></body></html>"
    out = plugin.on_post_page(html)
    assert "markreview.css" in out
    assert "markreview.js" in out
