import re
from utils import has_numbers, clean_text


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
