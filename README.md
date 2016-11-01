# Coffee Cloud App

use npm install to begin

node ./bin/www to launch express app
nodemon --debug ./bin/www
node-inspector
XR7vwshDKmKW

ssh -i ~/.ssh/coffeecloud.pem ubuntu@ec2-35-162-54-166.us-west-2.compute.amazonaws.com

forever start bin/www
forever stopall


for DB access
user: "cafenube",
pwd: "Sec03lP1nt0"
db name: dummyDB
ssh -N -L 8888:127.0.0.1:80 -i ~/.ssh/coffeecloud.pem bitnami@ec2-35-162-54-166.us-west-2.compute.amazonaws.com