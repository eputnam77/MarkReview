from src import stubs


def test_bulk_export_functions():
    assert stubs.bulk_accept_reject()
    assert stubs.export_document() == "exported"
