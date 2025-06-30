from src import stubs
import time


def test_diff_performance():
    size = 2 * 1024 * 1024
    old = "a" * size
    new = old.replace("a", "b")
    start = time.perf_counter()
    stubs.diff_doc(old, new)
    delta = time.perf_counter() - start
    assert delta < 0.01
