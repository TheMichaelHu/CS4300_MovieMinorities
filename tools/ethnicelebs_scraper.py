from __future__ import print_function
import urllib2
from bs4 import BeautifulSoup as bs
import csv
import unicodedata
import socket
import pandas as pd
import os
from slugify import slugify

START = 1
END = 33
BATCH_SIZE = 5
OUTPUT_FILE = "./data/ethnicelebs.csv"
ACTORS_FILE = "./data/actors.txt"

# globals because I live dangerously
actors = []
curr_actor = 0


def main():
    """
    Scrape ethniceleb.com for actors in ACTORS_FILE
    """
    start = START

    get_needed_actors()
    while start < END:
        end = min(start + BATCH_SIZE, END)
        try:
            links = get_celeb_links(start, end)
            print("================================")
            print("Writing pages %d to %d" % (start, end - 1))
            batched_write(links)
            print("================================")
        except Exception as e:
            print("Unknown exception caught:", e)
        start = end


def get_needed_actors():
    """
    Sets the actors global to actors we care about but don't have data for yet
    """
    global actors
    with open(ACTORS_FILE) as f:
        actors = sorted(f.read().splitlines())
    if not os.path.isfile(OUTPUT_FILE):
        return
    curr_actors = map(slugify, pd.read_csv(OUTPUT_FILE, header=None, usecols=[0])[0].tolist())
    actors = [actor for actor in actors if actor not in curr_actors]


def batched_write(links):
    """
    Writes actor ethnicities to OUTPUT_FILE in batches
    """
    with open(OUTPUT_FILE, 'ab+') as f:
        for i in range(len(links)):
            if i % 10 == 0:
                print("%d of %d" % (i, len(links)))

            link = links[i]
            try:
                req = urllib2.Request(link, headers={'User-Agent': "Daenerys Targaryen, first of her name"})
                page = urllib2.urlopen(req, timeout=5)
                soup = bs(page, "html.parser")
            except (urllib2.HTTPError, urllib2.URLError, socket.timeout) as e:
                print("Encountered error for", link, "\n", e)
                continue

            actor = slugify(soup.find("h1", attrs={"class": "entry-title"}).get_text())
            ethnicity = handle_unicode(soup.find("strong").get_text(strip=True)[11:])

            wr = csv.writer(f, quoting=csv.QUOTE_ALL)
            wr.writerow([actor, ethnicity])


def get_celeb_links(start, end):
    """
    Returns a batch of actor links
    """
    links = []
    for page_num in range(start, end):
        print("Reading celebs index page", page_num, "curr actor:", curr_actor)
        try:
            req = urllib2.Request("http://ethnicelebs.com/all-celebs?pg=%d" % page_num, headers={'User-Agent': "DA KING IN DA NORTH"})
            page = urllib2.urlopen(req, timeout=5)
            links.extend(get_page_links(page))
        except (urllib2.HTTPError, urllib2.URLError, socket.timeout) as e:
            print("Encountered error for", "http://ethnicelebs.com/all-celebs?pg=%d" % page_num, "\n", e)
            continue
    return links


def get_page_links(page):
    """
    Returns all valid actor links for a given page
    """
    soup = bs(page, "html.parser")
    for ul in soup.find_all("ul"):
        if ul.parent.name == "li":
            celeb_list = ul
            break
    else:
        print("No name found!")
        return []
    celebs = celeb_list.find_all(href=True)
    return get_valid_links(celebs)


def get_valid_links(celebs):
    """
    Returns a list of links to actors we're interested in but don't have ethnicities for yet
    """
    global curr_actor
    valid_celebs = []
    curr_celeb = 0

    while curr_celeb < len(celebs) and curr_actor < len(actors):
        orig_name = handle_unicode(celebs[curr_celeb].get_text()).lower()
        celeb = slugify(orig_name)
        actor = actors[curr_actor]

        if celeb == actor:
            valid_celebs.append(celebs[curr_celeb]["href"])
            curr_celeb += 1
            curr_actor += 1
        elif orig_name.replace("-", " ") > actor.replace("-", " "):
            curr_actor += 1
        else:
            curr_celeb += 1
    return valid_celebs


def handle_unicode(text):
    """
    Handle actor names with non-ascii symbols sort of
    """
    try:
        decode = ''.join((c for c in unicodedata.normalize('NFD', text) if unicodedata.category(c) != 'Mn')).encode("ascii")
    except UnicodeEncodeError as e:
        print("Can't handle string!", text)
        decode = ""
    return decode


if __name__ == "__main__":
    main()
