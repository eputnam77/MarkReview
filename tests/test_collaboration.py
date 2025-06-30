from src import stubs


def test_collaboration_placeholder():
    # Collaboration features are minimal in this stub implementation
    assert isinstance(stubs.start_diff_server(), str)
