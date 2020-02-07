from os.path import abspath, join, dirname
from requests import get
from requests.exceptions import RequestException
from contextlib import closing
from file import read_file, write_cache_file


def simple_get(url):
    """
    Attempts to get the content at `url` by making an HTTP GET request.
    If the content-type of response is some kind of HTML/XML, return the
    text content, otherwise return None.
    """

    filename = "{0}.html".format(url.split("/").pop().lower())
    filepath = abspath(join(dirname(__file__), "./cache", filename))
    file_data = read_file(filepath)

    if file_data != None:
        return file_data

    try:
        print("Fetching: {0}...".format(url))
        with closing(get(url, stream=True)) as resp:
            if is_good_response(resp):
                write_cache_file(filepath, resp.content)
                return resp.content
            else:
                return None

    except RequestException as e:
        log_error('Error during requests to {0} : {1}'.format(url, str(e)))
        return None


def is_good_response(resp):
    """
    Returns True if the response seems to be HTML, False otherwise.
    """
    content_type = resp.headers['Content-Type'].lower()
    return (resp.status_code == 200
            and content_type is not None
            and content_type.find('html') > -1)


def log_error(e):
    """
    It is always a good idea to log errors. 
    This function just prints them, but you can
    make it do anything.
    """
    print(e)
