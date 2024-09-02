import plantquest_sdk


def inc(x):
    return x + 1


def test_answer():
    print(plantquest_sdk)
    assert inc(3) == 4

