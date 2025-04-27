### Overview of Hythrmia - Backend
This is the backend that has all the logic of hythrmia, ensure authentication as well as executing all the required commands such as `nmap`, `arp-scan` ...etc. And ensure to return these information to the frontend.

>[!IMPORTANT]
>Ensure mysql docker container started before running this web application.


### Prerequisites
Ensure the latest version of python3 and pip are installed. Python3 [Download](https://www.python.org/downloads/) Ensure to download the right version on your system.

Ensure Docker is installed, instructions can be found [here](https://docs.docker.com/desktop/)

>[!CAUTION]
>For now docker is only used for the mysql database, we wouldn't be able to run this backend in a docker container because of the backend required tools that it needs to run such as `arp-scan` or `nmap` they need interact with their hardware directly.

### Clone the repository

```bash
git clone git@github.com:Hythrmia/backend.git
```

#### Environment Setup for the python backend

must first initialize python environment using:

```bash
python3 -m venv env
```

>[!TIP]
>Python environment: to make it simple, its just a safe place were all the required packages of the web application are installed safely and are not conflicted with the system host.

To activate the environment..

```bash
source env/bin/activate
```

>[!IMPORTANT]
>To exit out of the environment, must enter keyword `deactivate` from within the activated shell. Then it will get out of that environment.

#### Before running

Ensure to download all the required libraries using the following command:
```bash
pip install -r requirements.txt
```

Next, simply run the `app.py`

```bash
python3 app.py
```
