import re

##
# Helper functions
##


def get_table(html):
    return html.select("table.vcard")[0]


def find_value_cell(html, *args):
    ths = [n for n in html.find_all("th") if n.get_text().strip() in args]

    if len(ths) == 0:
        print("Could not find value cell for {0}".format(args))

    th = ths[0]
    td = th.next_sibling
    return td


def find_value_cell_text(html, *args):
    td = find_value_cell(html, *args)
    return td.get_text()


def move_ad(s):
    s = re.sub(r'\(|\)', "", s).strip()
    return "{0} AD".format(s.replace(" AD ", " ")) if " AD " in s else s

#####


def set_house(html, json):
    detail = get_table(html)
    value = find_value_cell_text(
        detail, "House", "Dynasty", "Imperial dynasty", "Imperial Dynasty")

    insensitive_remove = re.compile(re.escape('dynasty'), re.IGNORECASE)

    json["house"] = insensitive_remove.sub("", value).strip()


def set_birth(html, json):
    detail = get_table(html)
    parts = find_value_cell(detail, "Born")
    value = find_value_cell_text(detail, "Born")
    br1 = parts.find("br")

    if br1 != None:
        dob = br1.next_sibling.string
        birthplace = value.split(dob)[1]
    else:
        dob = parts.string
        birthplace = "Unknown"

    json["dateOfBirth"] = move_ad(dob)
    json["birthplace"] = birthplace


def set_death(html, json):
    detail = get_table(html)
    value = find_value_cell_text(detail, "Died")
    dod, deathplace = re.split(r' \(.*\)', value, 2)

    json["dateOfDeath"] = move_ad(re.sub(r'\(.*\)', "", dod))
    json["deathplace"] = deathplace


def set_reign(html, json):
    detail = get_table(html)

    value = find_value_cell_text(detail, "Reign")
    value = re.sub(r'\(.*$', "", value)
    start, end = value.split("–")

    json["reignStart"] = move_ad(start)
    json["reignEnd"] = move_ad(end)
