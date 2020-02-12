import re
import json
from file import write_file


def has_numbers(txt):
    return any(char.isdigit() for char in txt)


def clean_text(txt):
    return txt.replace("\n", "").strip()


def prepare_html_output(soup):
    return re.sub('"//', '"https://', str(soup).replace('href="/',
                                                        'href="https://en.wikipedia.org/'))


def json_dump(filepath, data):
    write_file(filepath, json.dumps(data, indent=2))
