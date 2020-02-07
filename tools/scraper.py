import os
import sys
from bs4 import BeautifulSoup
from config import load_config
from fetch import simple_get
from list_processors import get_name, get_image_url, get_birth_info, get_death_info, get_reign

modes = {
    "list": 1,
    "detail": 2
}


def setup():
    load_config()


def do_list_scrape():
    list_of_emperors = "https://en.wikipedia.org/wiki/List_of_Roman_emperors"
    page = simple_get(list_of_emperors)

    print("Processing emperor list...")
    html = BeautifulSoup(page, "html.parser")

    for tr in html.select(".wikitable > tbody > tr"):
        cells = tr.find_all("td")

        if len(cells) == 0:
            continue

        img = get_image_url(cells[0])
        name = get_name(cells[1])
        slug = name.replace(" ", "_")

        born_when, born_where = get_birth_info(cells[2])
        succession = cells[3].get_text()
        reign_start, reign_end = get_reign(cells[4])
        died_when, died_where = get_death_info(cells[6])

        print(slug, born_when, born_where)

    # TODO
    # Process page:
    # 2) turn row into record
    # 3) write records to ../content/data/emperors.json


if __name__ == "__main__":
    setup()

    mode = os.environ.get("MODE")

    if mode == None:
        print("MODE not set, exiting...")
        sys.exit()

    if int(mode) == modes.get("list"):
        do_list_scrape()

    elif int(mode) == modes.get("detail"):
        print("MODE 'detail' not implemented yet, exiting...")
        sys.exit()

    else:
        print("MODE not recognised, exiting...")
        sys.exit()
