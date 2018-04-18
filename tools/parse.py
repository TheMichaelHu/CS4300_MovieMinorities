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
            if c.isupper() and (not li.endswith(" POV")) and ("INT." not in l) and ("EXT." not in l) and ("--" not in l) and ("_" not in l) and ("- DAY" not in l) and ("INTERIOR" not in l) and ("CLOSE ON" != li) and ("CUT TO" != li) and ("EXTERIOR" not in l) and ("NSERT " not in l) and ("BACK TO " not in l) and ("ACTION " not in l) and ("OMITTED" not in l) and ('LATER THAT NIGHT -' not in l) and ("ANOTHER ANGLE" not in l) and ("IN THE CAR" not in l) and ("IN THE LOT" not in l) and ("ACROSS THE " not in l) and ("THE END" not in l) and ("END CREDITS" not in l) and ("FADE OUT" not in l) and (":" not in l) and ("!" not in l) and ("?" not in l) and ('"' not in l) and ("NEW ANGLE" != li) and ("CLOSEUP" not in l) and ("ANGLE ON TV" != li) and (not c.endswith(".")) and (c not in characters):
                characters.append(c)
        elif li != "": 
            num_lines = 1

    print(characters2)
    speaker = "";
    utterance = "";
    still_speaking = True
    second_time = False
    previous_spaces = 0

    for l in lines:
        li = l.strip(' \n\t\r')
        if li != "": 
            spmatch = spaces_regex.search(l)
            spaces_number = len(spmatch.group(1))
            ch = re.sub(r'\([^()]*\)', '', re.sub(r'\[[^()]*\]', '', li)).strip(' \n\t\r')
            if ch == "" or ch.startswith("(") or ch.endswith(")"):
                ch = ""
            elif (("INT." in l or "EXT." in l) and utterance != "") or li == "THE END":
                transcript.append({'speaker': speaker, 'utterance': re.sub(r'\[[^()]*\]', '', utterance.strip())})
                speaker = ""
                utterance = ""
                second_time = False 
            elif ch in characters2:
                if utterance != "" and speaker != ch and speaker != "":
                    second_time = False
                    transcript.append({'speaker': speaker, 'utterance': re.sub(r'\[[^()]*\]', '', utterance.strip())})
                    utterance = ""
                elif speaker == ch:
                    second_time = True
                speaker = ch;
                still_speaking = True
                previous_spaces = 0
            elif still_speaking == True and speaker != "":
                if (spaces_number == previous_spaces or previous_spaces == 0):
                    utterance += " " + li
                    previous_spaces = spaces_number;
                second_time = False                
        elif utterance == "" and speaker != "":
            still_speaking = True
        elif utterance != "" and second_time == False:
            still_speaking = False
    return transcript

if __name__ == "__main__":
    print(parse_transcript(SCRIPT_PATH))
