from src import stubs


def test_comment_thread():
    thread = stubs.create_comment_thread()
    c = stubs.Comment(id="1", change_id="c1", content="hi", author="a", timestamp=0)
    thread.add(c)
    assert thread.list()[0].content == "hi"
    thread.resolve("1")
    assert thread.list()[0].resolved
