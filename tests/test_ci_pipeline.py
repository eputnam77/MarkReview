from src import stubs


def test_configure_ci_pipeline():
    cmds = stubs.configure_ci_pipeline()
    assert "ruff" in cmds and "pytest" in cmds
