from __future__ import print_function
import urllib2
from bs4 import BeautifulSoup as bs
import csv

START = 1
END = 129
BATCH_SIZE = 10
OUTPUT_FILE = "./ethnicelebs.csv"


def main():
    # clear file
    f = open(OUTPUT_FILE, 'wb+')
    f.close()

    start = START
    while start < END:
        end = min(start + BATCH_SIZE, END)
        links = get_celeb_links(start, end)
        print("Writing pages %d to %d" % (start, end - 1))
        start = end
        batched_write(links)


def batched_write(links):
    with open(OUTPUT_FILE, 'wb') as f:
        for i in range(len(links)):
            if i % 100 == 0:
                print("%d of %d" % (i, len(links)))

            link = links[i]
            req = urllib2.Request(link, headers={'User-Agent': "Daenerys Targaryen, first of her name"})
            page = urllib2.urlopen(req)
            soup = bs(page, "html.parser")

            actor = soup.find("h1", attrs={"class": "entry-title"}).get_text().encode("utf-8")
            ethnicity = soup.find("strong").get_text(strip=True)[11:]

            wr = csv.writer(f, quoting=csv.QUOTE_ALL)
            wr.writerow([actor, ethnicity])


def get_celeb_links(start=1, end=129):
    links = []
    for page_num in range(start, end):
        print("Reading celebs index page", page_num)
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
        return []
    return [celeb["href"] for celeb in celeb_list.find_all(href=True)]


if __name__ == "__main__":
    main()
