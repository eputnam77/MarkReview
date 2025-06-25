"""MkDocs plugin to enable CriticMarkup and inject runtime assets."""

from __future__ import annotations

from pathlib import Path
import shutil
from typing import Any


class MkDocsBasePlugin:  # pragma: no cover - fallback when MkDocs is missing
    """Fallback BasePlugin when MkDocs isn't installed."""


class MarkTracePlugin(MkDocsBasePlugin):
    """Inject ``pymdownx.critic`` and copy JS/CSS assets."""

    _css_name = "marktrace.css"
    _js_name = "marktrace.js"

    def on_config(self, config: dict[str, Any]) -> dict[str, Any]:
        """Ensure ``pymdownx.critic`` is enabled."""
        if "markdown_extensions" not in config:
            config["markdown_extensions"] = []

        if "pymdownx.critic" not in config["markdown_extensions"]:
            config["markdown_extensions"].append("pymdownx.critic")

        # Record site directory for ``on_post_build``.
        self._site_dir = Path(config.get("site_dir", "site"))
        self._assets_dir = Path(__file__).parent / "assets"
        return config

    def on_post_page(self, output: str, **_kwargs: object) -> str:
        """Inject markup JS and CSS tags into the rendered HTML."""
        css_tag = f'<link rel="stylesheet" href="{self._css_name}">'  # noqa: E501
        js_tag = f'<script src="{self._js_name}"></script>'
        if "</head>" in output:
            output = output.replace("</head>", f"    {css_tag}\n</head>")
        if "</body>" in output:
            output = output.replace("</body>", f"    {js_tag}\n</body>")
        return output

    def on_post_build(self, **_kwargs: object) -> None:
        """Copy static assets into the output directory."""
        self._site_dir.mkdir(parents=True, exist_ok=True)
        for name in (self._css_name, self._js_name):
            src = self._assets_dir / name
            dest = self._site_dir / name
            if src.exists():
                shutil.copy(src, dest)
