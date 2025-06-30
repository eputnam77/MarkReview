"""Basic keybinding helpers for the review UI."""

from __future__ import annotations


def activate_keybindings() -> bool:
    """Pretend to register browser keybindings.

    In the real project this would attach listeners for ``a`` and ``r``
    shortcuts.  The current implementation simply returns ``True`` so tests can
    validate that the function was invoked without side effects.
    """

    return True
