from typing import List, Union
import subprocess
from .parser import ArpParser, NmapParser, FluxParser

class Command:
    def __init__(self, cmd:str, options:List[str]):
        self.cmd = cmd
        self.options = options

    def execute(self) -> Union[ArpParser, NmapParser, FluxParser, str]: #If Needed: Union all other Parsers here.
        try:
            args = [self.cmd] + self.options
            print(f"Command: {" ".join(args)}")
            result = subprocess.run(args, capture_output=True, text=True, check=True)
            if result.returncode != 0:
                return f"Error: {result.stderr.strip()}"

            # Parse the output from here (OPTIONAL)
            if self.cmd == "arp-scan":
                return ArpParser(output=result.stdout)
            if self.cmd == "nmap":
                return NmapParser(output=result.stdout)
            if self.cmd == "flux_led":
                return FluxParser(output=result.stdout)
            else:
                return f"command: {self.cmd}, {result.stdout}"

        except FileNotFoundError as e:
            return f"Command not found: {self.cmd}"

        except subprocess.CalledProcessError as e:
            return f"Error occurred during command execution: {e.stderr}"

        except Exception as e:
            return f"An unexpected error occurred: {str(e)}"

