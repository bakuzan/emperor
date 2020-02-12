import re
from utils import has_numbers, clean_text


def get_image_url(cell):
    img = cell.find("img")
    return "https:{0}".format(img["src"])


def get_name(cell):
    link = cell.find("a")
    return link.string


def get_slug(cell):
    link = cell.find("a")
    url = link["href"]
    return url.replace("/wiki/", "")


def get_death_info(cell):
    txt = clean_text(cell.get_text())
    parts = re.split(r"\(.*\)", txt)

    if len(parts) == 2:
        when, where_how = parts
        return clean_text(when), clean_text(where_how)

    single = parts[0]

    # TODO
    # Gotta fix these to return cause of death

    return single, ""
