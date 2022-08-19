cd /home/ubuntu/server
echo "pulling updated code"
git pull
echo "stopping server"
docker stop server
echo "removing server"
docker rm server
echo "removing image"
docker rmi server
echo "building new image"
docker build . -t server
echo "running container"
docker run -d -p 5000:5000 --name server server
echo "deployed"