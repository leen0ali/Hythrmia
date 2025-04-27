FROM mysql:8.0

ENV MYSQL_ROOT_PASSWORD=rootpassword
ENV MYSQL_USER=user
ENV MYSQL_PASSWORD=password
ENV MYSQL_DATABASE=hythrmia_db

COPY init.sql /docker-entrypoint-initdb.d/

EXPOSE 3306
CMD ["mysqld"]
