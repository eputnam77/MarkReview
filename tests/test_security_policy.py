from src import stubs


def test_security_enforcement():
    assert stubs.enforce_security_and_semver_policy()
