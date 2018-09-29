docker container run --p 80:80 ngnix
docker container run --publish  80:80 --detach --name webhost ngnix
docker container run -d -p 80:80 --name webserver nginx

docker container run -d --network my_app_net --name webserver2 nginx

start vs run
run always start a new container
start start an existing container 

docker container logs <container-name>

//Named volume when you do <name>: before the path 
docker container run -d --name mysql -e MYSQL_ALLOW_EMPTY_PASSWORD=True mysql
docker container run -d --name mysql -e MYSQL_ALLOW_EMPTY_PASSWORD=True -v mysql-db:/var/lib/mysql mysql
docker volume inspect mysql-db
docker container rm -f mysql

//Database upgrade with Named volume
docker container run -d --name psql -v psql:/var/lib/postgresql/data postgres:9.6.1
docker container logs -f psql 
docker container run -d --name psql2 -v psql:/var/lib/postgresql/data postgres:9.6.2
docker container ps -a
docker volume ls