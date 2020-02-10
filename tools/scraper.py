import os
import sys
import json
from os.path import abspath, join, dirname
from bs4 import BeautifulSoup
from config import load_config
from fetch import simple_get
from list_processors import get_name, get_image_url, get_birth_info, get_death_info, get_reign
from node_processors import set_birth, set_death, set_reign, set_house
from file import load_json, write_file
from utils import clean_text, prepare_html_output

html_detail_breakpoint = "\n\n[comment]: # 'breakpoint'\n"

modes = {
    "list": 1,
    "detail": 2
}


def setup():
    load_config()


def get_data_filepath(filename):
    return abspath(join(dirname(__file__), "../content/data/", filename))


def do_list_scrape():
    list_of_emperors = "https://en.wikipedia.org/wiki/List_of_Roman_emperors"
    page = simple_get(list_of_emperors)

    print("Processing emperor list...")
    emperors = []

    html = BeautifulSoup(page, "html.parser")

    items = [tr.find_all("td") for tr in html.select(
        ".wikitable > tbody > tr") if len(tr.find_all("td")) > 0]

    for cells in items:
        img = get_image_url(cells[0])
        name = get_name(cells[1])
        slug = name.replace(" ", "_")
        succession = clean_text(cells[3].get_text())

        # TODO
        # These are gross...maybe to get them from the individual emperor pages...
        # born_when, born_where = get_birth_info(cells[2])
        # reign_start, reign_end = get_reign(cells[4])
        # died_when, died_where_why = get_death_info(cells[6])

        emp = {
            "slug": slug,
            "name": name,
            "image": img,
            "succession": succession,
        }
        # "dateOfBirth": born_when,
        # "birthplace": born_where,
        # "dateOfDeath": died_when,
        # "deathInfo": died_where_why,
        # "reignStart": reign_start,
        # "reignEnd": reign_end

        emperors.append(emp)

    filepath = get_data_filepath("emperors.json")
    write_file(filepath, json.dumps(emperors, indent=2))


def do_detail_scrape(index, limit):
    filepath = get_data_filepath("emperors.json")
    data = load_json(filepath)

    items = data[index:limit]
    for item in items:
        item_slug = item["slug"]
        item_url = "https://en.wikipedia.org/wiki/{0}".format(item_slug)
        page = simple_get(item_url)

        print("Processing {0}...".format(item_slug), flush=True)
        html = BeautifulSoup(page, "html.parser")

        set_birth(html, item)
        set_death(html, item)
        set_reign(html, item)
        set_house(html, item)

        photo = html.select("td.photo").pop()
        photo.name = "div"
        photo["style"] = "text-align: center; margin: 25px 0 10px;"

        paragraphs = []
        for el in html.find(id="toc").previous_siblings:
            if el.name == None:
                continue

            if el.name != "p":
                break

            paragraphs.append(el)

        filepath = get_data_filepath("{0}.md".format(item_slug))
        details = [str(photo), html_detail_breakpoint] + \
            [str(node) for node in reversed(paragraphs)]

        soup = BeautifulSoup("".join(details), "html.parser")
        output = prepare_html_output(soup)
        write_file(filepath, output)

    print("Updating emperor list...")
    data[index:limit] = items
    filepath = get_data_filepath("emperors.json")
    write_file(filepath, json.dumps(data, indent=2))


if __name__ == "__main__":
    setup()

    mode = os.environ.get("MODE")
    start_index = int(os.environ.get("START_INDEX", 0))
    limit = min(int(os.environ.get("LIMIT", 5)), 20)

    if mode == None:
        print("MODE not set, exiting...")
        sys.exit()

    if int(mode) == modes.get("list"):
        do_list_scrape()
        print("Finished writing emperors.json.")
        sys.exit()

    elif int(mode) == modes.get("detail"):
        do_detail_scrape(start_index, limit)
        print("Finished writing emperor details.")
        sys.exit()

    else:
        print("MODE not recognised, exiting...")
        sys.exit()
