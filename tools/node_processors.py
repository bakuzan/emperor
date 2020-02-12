import sys
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
        return None

    th = ths[0]
    td = th.next_sibling
    return td


def find_value_cell_text(html, *args):
    td = find_value_cell(html, *args)
    if td is None:
        return None

    return td.get_text()


def move_ad(s):
    s = re.sub(r'\(|\)', "", s).strip()
    d = "{0} AD".format(s.replace(" AD ", " ")) if " AD " in s else s
    return remove_references(d)


def remove_references(s):
    return re.sub(r'\[.*\]', "", s).strip()


def protect_regex(s):
    return s.replace("(", "\(").replace(")", "\)")

#####


def set_house(html, json):
    detail = get_table(html)
    value = find_value_cell_text(
        detail, "House", "Dynasty", "Imperial dynasty", "Imperial Dynasty")

    insensitive_remove = re.compile(re.escape('dynasty'), re.IGNORECASE)

    json["house"] = "None" if value is None else insensitive_remove.sub(
        "", value).strip()


def set_birth(html, json):
    detail = get_table(html)
    parts = find_value_cell(detail, "Born")
    value = find_value_cell_text(detail, "Born")

    if parts is None:
        json["dateOfBirth"] = "Unknown"
        json["birthplace"] = "Unknown"

    else:
        brs = parts.find_all("br")

        if len(brs) > 1:
            br1 = brs[0]
            dob = br1.next_sibling.string
            birthplace = value.split(dob)[1]
        elif len(brs) == 1:
            br1 = brs[0]
            place = protect_regex(br1.next_sibling.string)
            nonplace = re.sub(r'{0}.*$'.format(place), "", value)
            dob = remove_references(nonplace)
            birthplace = value.replace(dob, "")
        else:
            dob = parts.string
            birthplace = "Unknown"

        json["dateOfBirth"] = move_ad(dob)
        json["birthplace"] = remove_references(birthplace)


def set_death(html, json):
    detail = get_table(html)
    value = find_value_cell_text(detail, "Died")

    dod, *other = re.split(r' \(.*\)', value, 2)
    deathplace = other[0] if len(other) > 0 and other[0] else "Unknown"

    json["dateOfDeath"] = move_ad(re.sub(r'\(.*\)', "", dod))
    json["deathplace"] = remove_references(deathplace)


def set_reign(html, json):
    detail = get_table(html)

    value = find_value_cell_text(detail, "Reign", "Emperor")
    value = re.sub(r'\(.*$', "", value)

    if "–" in value:
        start, end = value.split("–")
    elif "-" in value:
        start, end = value.split("-")
    else:
        print("Unknown reign format: {0}".format(value))
        sys.exit(0)

    json["reignStart"] = move_ad(start)
    json["reignEnd"] = move_ad(end)
