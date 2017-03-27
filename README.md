# Coffee Cloud App

use npm install to begin

node ./bin/www to launch express app
nodemon --debug ./bin/www
node-inspector

ssh -i ~/.ssh/coffeecloud.pem ubuntu@coffeecloud.centroclima.org


cd apps/coffeecloud/Coffee-Cloud

sudo forever start bin/www
sudo forever stopall


for DB access
user: "cafenube",
pwd: "Sec03lP1nt0"
db name: dummyDB
ssh -N -L 8888:127.0.0.1:80 -i ~/.ssh/coffeecloud.pem bitnami@coffeecloud.centroclima.org


sudo fuser -k 80/tcp