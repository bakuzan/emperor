import re
from utils import has_numbers, clean_text


def get_image_url(cell):
    img = cell.find("img")
    return "https:{0}".format(img["src"])


def get_name(cell):
    link = cell.find("a")
    return link.string


def get_birth_info(cell):
    txt = clean_text(cell.get_text())
    parts = txt.split(",")
    num_parts = len(parts)

    if num_parts == 1:
        date = parts[0]
        return date, ""

    if num_parts == 2:
        date, place = parts
        return date, place

    if num_parts == 3:
        date, maybe, place = parts
        maybe_is_date = has_numbers(maybe)

        date = "{0} {1}".format(date, maybe) if maybe_is_date else date
        place = "{0} {1}".format(maybe, place) if not maybe_is_date else place

        return date, place

    d_one, d_two, p_one, p_two = parts
    return clean_text("{0} {1}".format(d_one, d_two)), clean_text("{0} {1}".format(p_one, p_two))


def get_death_info(cell):
    txt = clean_text(cell.get_text())
    parts = re.split(r"\(.*\)", txt)

    if len(parts) == 2:
        when, where_how = parts
        return clean_text(when), clean_text(where_how)

    single = parts[0]

    # TODO
    # Gotta fix these

    return single, ""


def get_reign(cell):
    txt = clean_text(cell.get_text())
    parts = txt.split("–")
    count = len(parts)

    if count == 2:
        start, end = parts
        return clean_text(start), clean_text(end)

    # TODO

    return "", ""
