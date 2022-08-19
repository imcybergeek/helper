cd /home/ubuntu/server
echo "pulling updated code"
git pull
echo "stopping server"
SECONDS=0
docker stop server
echo "removing server"
docker rm server
echo "removing image"
docker rmi server
echo "building new image"
docker build . -t server
echo "running container"
docker run -d -p 5000:5000 --name server server
ELAPSED="Server Downtime: $(($SECONDS / 3600))hrs $((($SECONDS / 60) % 60))min $(($SECONDS % 60))sec"
echo $ELAPSED
echo "deployed"