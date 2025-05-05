# MYSQL 8.0 - Hythrmia

>[!TIP]
>Refer to this docker documentation [https://docs.docker.com/engine/install/](https://docs.docker.com/engine/install/).

This will be running through docker container. Before starting, just to ensure the environment variabels used are the following: 

```dockerfile
ENV MYSQL_ROOT_PASSWORD=rootpassword
ENV MYSQL_USER=external_user
ENV MYSQL_PASSWORD=password
ENV MYSQL_DATABASE=my_database
```

>[!NOTE]
>These are only for development environment, must change for production.

### Build the docker image

```bash
docker build -t mysql_hythrmia .
```

### Running the container

```bash
docker run -d -p 3306:3306 -v mysql-data:/var/lib/mysql --name Hythrmia_db mysql_hythrmia
```
- `-d` means detached container
- `--name` specifying the name of the container
- `-p` specifying a port number to map it to the host
- `-v` specifying the volume, this is shared between the host and the container

>[!NOTE]
>If by any chance wanted to delete the sql tables, you can delete the volume and create another. To delete the content use the following command `docker volume rm <name>` to list all the volumes, `docker volume ls`.

There is another way to run the container and use the host network.

>[!NOTE]
The following command might not work in macOS systems

```bash
docker run -d --network host -v mysql-data:/var/lib/mysql --name Hythrmia_db mysql_hythrmia
```

### Login in into the container and managing the tables if needed

```bash
docker exec -it Hythrmia_db bash
```
Next will need to login to mysql

```bash
mysql -u user -p
```

This will ask for a password, must enter the password used within the docker file.


then the following commands is to access the tables and to see what is stored

First we will need to select the database, so the following command will list all the databases

```bash
show databases;
```

Then select / use a database

```bash
use hythrmia_db;
```

Once that command executed, now we can show all tables created for that selected database

```bash
show tables;
```

Next, once we know what table we need to see whats stored in them, we execute the following commands

Here are some examples of how to query and get the data stored. The first command it will selected all the columns used from the users table, and list all the users in there. 
```bash
select * from users;
```
```bash
select * from devices;
```