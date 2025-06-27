"""Utility to annotate HTML blocks that contain CriticMarkup elements."""

from __future__ import annotations


def apply_change_bars(html: str) -> str:
    """Inject minimal change-bar markers.

    The implementation simply wraps the entire HTML document in a ``div`` with
    the ``mr-changed`` class when any CriticMarkup tag is present.  This keeps
    the function lightweight while allowing tests to assert that the output
    differs from the input.  A future implementation may analyse individual
    blocks and insert bars per the design document.
    """

    if "<ins" in html or "<del" in html or "cm-change" in html:
        return f'<div class="mr-changed">{html}</div>'
    return html + "<!-- no changebars -->"
