import re
from utils import has_numbers, clean_text


##
# Helper functions
##

def process_regin_date(txt):
    txt = clean_text(txt)

    if "," in txt:
        other, year = txt.split(",")
        parts = other.split(" ")
        if len(parts) == 2:
            month, day = parts
        else:
            month = parts[0]
            day = ""

        return "{0} {1} {2}".format(day, month, year)

    if " " in txt:
        parts = txt.split(" ")

        if len(parts) == 3:
            date = parts[1] if has_numbers(parts[1]) else parts[0]
            month = parts[0] if has_numbers(parts[1]) else parts[1]
            return "{0} {1} {2}".format(date, month, parts[2])

    return txt


##########

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


def get_reign(cell):
    txt = clean_text(cell.get_text())
    parts = re.split(r"–", txt)
    count = len(parts)

    if count == 2:
        start = process_regin_date(parts[0])
        end = process_regin_date(parts[1])
    elif count == 1:
        date = process_regin_date(parts[0])
        start = date
        end = date
    else:
        print("Has {0} parts...".format(count))
        start = ""
        end = ""

    return clean_text(start), clean_text(end)


def get_empire(cell):
    txt = clean_text(cell.get_text())

    if "(EAST and WEST)" in txt:
        return ""

    if "(WEST)" in txt:
        return "West"

    if "(EAST)" in txt:
        return "East"

    return ""
