from os import path


def read_file(filename):
    if not path.isfile(filename):
        return None

    with open(filename, "rb") as file:
        return file.read()


def write_file(filename, data):
    print("Writing file: {0}".format(filename), flush=True)
    with open(filename, "wb") as file:
        file.write(data)
