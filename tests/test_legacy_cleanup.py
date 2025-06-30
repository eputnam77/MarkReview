from src import stubs


def test_remove_legacy_packages():
    pkgs = stubs.remove_legacy_packages()
    assert pkgs == []
