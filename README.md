# Coffee Cloud App

use npm install to begin

node ./bin/www to launch express app
nodemon --debug ./bin/www
node-inspector
app pw: bhkXOGO8uHSP

ssh -i ~/.ssh/coffee-cloud-nica.pem ubuntu@cafenica.centroclima.org

forever start bin/www
forever stopall


for DB access
user: "cafenube",
pwd: "Sec03lP1nt0"
db name: dummyDB

ssh -N -L 8888:127.0.0.1:80 -i ~/.ssh/coffeecloud.pem bitnami@cafenica.centroclima.org


sudo fuser -k 80/tcp

