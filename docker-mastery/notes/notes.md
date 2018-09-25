docker container run --p 80:80 ngnix
docker container run --publish  80:80 --detach --name webhost ngnix
docker container run -d -p 80:80 --name webserver nginx

docker container run -d --network my_app_net --name webserver2 nginx

start vs run
run always start a new container
start start an existing container 

docker container logs <container-name>
