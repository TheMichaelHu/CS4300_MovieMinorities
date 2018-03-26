from __future__ import print_function
import urllib2
from bs4 import BeautifulSoup as bs
import csv
import unicodedata
import socket

START = 1
END = 33
BATCH_SIZE = 5
OUTPUT_FILE = "./data/ethnicelebs.csv"
ACTORS_FILE = "./data/actors.txt"

# globals because I live dangerously
actors = []
curr_actor = 0


def main():
    global actors
    with open(ACTORS_FILE) as f:
        actors = sorted(f.read().splitlines())

    start = START
    while start < END:
        end = min(start + BATCH_SIZE, END)
        links = get_celeb_links(start, end)
        print("================================")
        print("Writing pages %d to %d" % (start, end - 1))
        start = end
        batched_write(links)
        print("================================")


def batched_write(links):
    with open(OUTPUT_FILE, 'ab+') as f:
        for i in range(len(links)):
            if i % 10 == 0:
                print("%d of %d" % (i, len(links)))

            link = links[i]
            req = urllib2.Request(link, headers={'User-Agent': "Daenerys Targaryen, first of her name"})
            try:
                page = urllib2.urlopen(req, timeout=5)
            except urllib2.HTTPError as e:
                print("Encountered error for", link)
                continue
            except socket.timeout as e:
                print("Timed out")
                continue
            soup = bs(page, "html.parser")

            actor = handle_unicode(soup.find("h1", attrs={"class": "entry-title"}).get_text())
            ethnicity = handle_unicode(soup.find("strong").get_text(strip=True)[11:])

            wr = csv.writer(f, quoting=csv.QUOTE_ALL)
            wr.writerow([actor, ethnicity])


def get_celeb_links(start, end):
    links = []
    for page_num in range(start, end):
        print("Reading celebs index page", page_num, "curr actor:", curr_actor)
        req = urllib2.Request("http://ethnicelebs.com/all-celebs?pg=%d" % page_num, headers={'User-Agent': "DA KING IN DA NORTH"})
        page = urllib2.urlopen(req)
        links.extend(get_page_links(page))
    return links


def get_page_links(page):
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
    global curr_actor
    valid_celebs = []
    curr_celeb = 0

    while curr_celeb < len(celebs) and curr_actor < len(actors):
        celeb = handle_unicode(celebs[curr_celeb].get_text())
        actor = actors[curr_actor]
        if celeb.lower() == actor.lower():
            valid_celebs.append(celebs[curr_celeb]["href"])
            curr_celeb += 1
            curr_actor += 1
        elif celeb.lower() > actor.lower():
            curr_actor += 1
        else:
            curr_celeb += 1
    return valid_celebs


def handle_unicode(text):
    try:
        decode = ''.join((c for c in unicodedata.normalize('NFD', text) if unicodedata.category(c) != 'Mn')).encode("ascii")
    except UnicodeEncodeError as e:
        print("Can't handle string!", text)
        decode = ""
    return decode


if __name__ == "__main__":
    main()
