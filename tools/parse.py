import re

SCRIPT_PATH = "./data/scripts/V-for-Vendetta.txt"
def parse_transcript(filename):

    spaces_regex = re.compile("^(\s*).*")
    location_regex = re.compile("^\s*(INT\.|EXT\.)")
    line_list = []
    transcript = []
    characters = []
    characters2 = []

    text_file = open("scripts/" + filename, "r")
    lines = text_file.readlines()
    text_file.close()

    num_lines = 0;
    for l in lines:
        li = l.strip(' \n\t\r')
        if li != "" and num_lines != 0:
            c = re.sub(r'\([^()]*\)', '', li).strip(' \n\t\r')
            if (c in characters) and (c not in characters2):
                characters2.append(c)
            if c.isupper() and ("INT." not in l) and ("EXT." not in l) and ("OMITTED" not in l) and ("ANOTHER ANGLE" not in l) and ("THE END" not in l) and ("END CREDITS" not in l) and ("FADE OUT" not in l) and (":" not in l) and ("!" not in l) and ("?" not in l) and ('"' not in l) and (not c.endswith(".")) and (c not in characters):
                characters.append(c)
        elif li != "": 
            num_lines = 1

    speaker = "";
    utterance = "";
    still_speaking = True
    second_time = False

    for l in lines:
        li = l.strip(' \n\t\r')
        if li != "": 
            ch = re.sub(r'\([^()]*\)', '', li).strip(' \n\t\r')
            if ch == "":
                ch = ""
            elif ch in characters2:
                if utterance != "" and speaker != ch and speaker != "":
                    second_time = False
                    transcript.append({'speaker': speaker, 'utterance': utterance.strip()})
                    utterance = ""
                elif speaker == ch:
                    second_time = True
                speaker = ch;
                still_speaking = True
            elif still_speaking == True and speaker != "":
                utterance += " " + li
                second_time = False
        elif utterance == "":
            still_speaking = True
        elif utterance != "" and second_time == False:
            still_speaking = False

    return transcript


if __name__ == "__main__":
    print(parse_transcript(SCRIPT_PATH))
