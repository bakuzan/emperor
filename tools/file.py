import json
from os import path


def read_file(filename):
    if not path.isfile(filename):
        return None

    with open(filename, "rb") as file:
        return file.read()


def load_json(filename):
    with open(filename, "r") as file:
        return json.load(file)


def write_cache_file(filename, data):
    print("Writing file: {0}".format(filename), flush=True)
    with open(filename, "wb") as file:
        file.write(data)


def write_file(filename, data):
    print("Writing file: {0}".format(filename), flush=True)
    with open(filename, "w", encoding='utf-8') as file:
        file.write(data)
