from src import stubs


def test_adapter_wrappers():
    assert isinstance(stubs.attach(object()), stubs.Controller)
