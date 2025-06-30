from src import stubs


def test_publish_alpha_release():
    assert stubs.publish_alpha_release() == "0.1.0"
