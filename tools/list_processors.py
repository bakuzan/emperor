
def get_image_url(cell):
    img = cell.find("img")
    return "https:{0}".format(img["src"])


def get_name(cell):
    link = cell.find("a")
    return link.string


def get_birth_info(cell):
    txt = cell.get_text()
    return txt, ""


def get_death_info(cell):
    txt = cell.get_text()
    return txt, ""


def get_reign(cell):
    txt = cell.get_text()
    return "", ""
