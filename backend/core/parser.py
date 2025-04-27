from typing import List, Tuple
import re

class ArpParser:
    def __init__(self, output: str):
        self.lines = output.splitlines()

    def parse(self):
        parsed = []
        for linenumber, line in enumerate(self.lines):
            line = line.replace("\t", " ") 
            pieces = line.split(sep=" ")
            if linenumber == 0:
                parsed.append({"ip":pieces[7], "mac":pieces[5], "name":"localhost"})
                continue
            elif len(line) == 0:
                break
            elif linenumber == 1:
                continue
            parsed.append({"ip":pieces[0], "mac":pieces[1], "name": " ".join(pieces[2:])})
        return parsed

class FluxParser:
    def __init__(self, output: str):
        self.lines = output.splitlines()

    def parse(self):
        parsed = []
        status = ""
        for index, line in enumerate(self.lines):
            if index == 0:
                status = line
                continue
            line = line.strip()
            line = line.replace("\t", " ") 
            print(line)
            pieces = line.split(sep=" ")
            parsed.append({"id": pieces[0], "ip": pieces[1]})
        return parsed, status

class NmapParser:
    def __init__(self, output: str):
        self.lines = output.splitlines()
    def parse(self):
        parsed = []
        for line in self.lines:
            match = re.match(r"(\d+)/(\w+)\s+(\w+)", line)
            if match:
                port, _, status = match.groups()
                parsed.append({"port":port, "status":status})
        return parsed

