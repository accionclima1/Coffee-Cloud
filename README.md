# Coffee Cloud App

use npm install to begin

node ./bin/www to launch express app
nodemon --debug ./bin/www
node-inspector

ssh -i ~/.ssh/coffee-cloud-nica.pem ubuntu@ec2-52-39-131-205.us-west-2.compute.amazonaws.com

forever start bin/www
forever stopall


for DB access
user: "cafenube",
pwd: "Sec03lP1nt0"
db name: dummyDB
<<<<<<< HEAD
ssh -N -L 8888:127.0.0.1:80 -i ~/.ssh/coffee-cloud-nica.pem bitnami@ec2-52-39-131-205.us-west-2.compute.amazonaws.com
=======
ssh -N -L 8888:127.0.0.1:80 -i ~/.ssh/coffeecloud.pem bitnami@coffeecloud.centroclima.org


sudo fuser -k 80/tcp
>>>>>>> master
