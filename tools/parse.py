import os, sys, json, re, argparse, urllib.request
from bs4 import BeautifulSoup, Tag, UnicodeDammit

def parse_transcript(filename):

    spaces_regex = re.compile("^(\s*).*")
    location_regex = re.compile("^\s*(INT\.|EXT\.)")
    line_list = []
    options = [0] * 100
    opt = []
    transcript = []

    text_file = open("~/CS4300_MovieMinorities/tools/data/scripts/" + filename, "r")
    lines = text_file.readlines()
    for l in lines:
        li = l.strip(' \n\t\r')
        if li != "":
            spmatch = spaces_regex.search(l)
            spaces_number = len(spmatch.group(1))
            options[spaces_number] += 1
            line_list.append((li, spaces_number))
    for i in range (0,50):
        if options[i] >= 20:
            opt.append(i)
    print(opt)
    text_file.close()

    speaker = "";
    utterance = "";

    for l in lines:
        li = l.strip(' \n\t\r')
        if li != "": 
            spmatch = spaces_regex.search(l)
            spaces_number = len(spmatch.group(1))
            if spaces_number == opt[2]:
                if utterance != "" and speaker != "":
                    transcript.append({'speaker': speaker, 'utterance': utterance.strip()})
                    utterance = ""
                speaker = re.sub(r'\([^()]*\)', '', li).strip(' \n\t\r');
            elif spaces_number == opt[1]:
                utterance += " " + li
            else:
                if utterance != "" and speaker != "":
                    transcript.append({'speaker': speaker, 'utterance': utterance.strip()})
                    utterance = ""
                    speaker = ""

    return transcript

print (parse_transcript("V-for-Vendetta.txt"))




